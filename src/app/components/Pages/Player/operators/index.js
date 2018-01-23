import * as Inferno from "inferno";
import { Operators } from "lib/constants";
import * as stats from "lib/stats";
import Chart, { colors, labelInterpolationFnc } from "components/misc/Chart";
import Icon, { GLYPHS } from "components/misc/Icon";
import Scale, { SCALES } from "components/misc/Scale";
import Fauxtable from "components/misc/Fauxtable";
import "./opstab.scss";

const sorters = [
    { key: "name", label: "name", fn: (a, b) => (a.name || "").localeCompare(b.name) },
    { key: "won", label: "won", fn: (a, b) => b.won - a.won },
    { key: "lost", label: "lost", fn: (a, b) => b.lost - a.lost },
    {
        key: "wlr",
        label: "win ratio",
        fn: (a, b) => stats.getWinChanceRaw(b) - stats.getWinChanceRaw(a),
    },
    { key: "kills", label: "kills", fn: (a, b) => b.kills - a.kills },
    { key: "deaths", label: "deaths", fn: (a, b) => b.deaths - a.deaths },
    {
        key: "kdr",
        label: "k/d ratio",
        fn: (a, b) => stats.getKillRatio(b) - stats.getKillRatio(a),
    },
    { key: "kpr", label: "kills/round", fn: (a, b) => b.kpr - a.kpr },
    {
        key: "survival",
        label: "rounds survived",
        fn: (a, b) => b.survivalRate - a.survivalRate,
    },
    {
        key: "time",
        label: "time played",
        fn: (a, b) => b.timePlayed - a.timePlayed,
    },
];
const filters = {
    None: () => true,
    Attackers: op => op.side === "Attack",
    Defenders: op => op.side === "Defense",
    GIGN: op => op.unit === "GIGN",
    SAS: op => op.unit === "SAS",
    GSG9: op => op.unit === "GSG9",
    FBI: op => op.unit === "FBI",
    SPEZNAS: op => op.unit === "SPEZNAS",
    "JTF-2": op => op.unit === "JTF-2",
    SEALS: op => op.unit === "SEALS",
    BOPE: op => op.unit === "BOPE",
    SAT: op => op.unit === "SAT",
    GEO: op => op.unit === "GEO",
    GROM: op => op.unit === "GROM",
    SDU: op => op.unit === "SDU",
    SMB: op => op.unit === "SMB",
};

export default {
    oninit({ attrs, state }) {
        let filterProp = "None";
        let sorter = sorters[0];
        let isSortReversed = false;

        state.getSorterClass = tester => {
            if (tester !== sorter) {
                return tester.key;
            }
            return isSortReversed ? tester.key + " is-active is-reversed" : tester.key + " is-active";
        };
        state.sort = function(a, b) {
            const res = sorter.fn(a, b);
            return isSortReversed ? -res : res;
        };
        state.setSort = newSorter => {
            if (newSorter === sorter) {
                isSortReversed = !isSortReversed;
            } else {
                isSortReversed = false;
                sorter = newSorter;
            }
        };
        state.filter = x => filters[filterProp](x);

        const ops = (state.ops = Object.keys(attrs.stats.operator).reduce((acc, curr) => {
            const op = attrs.stats.operator[curr];
            const k = op.kills || 0;
            const d = op.deaths || 0;
            const w = op.won || 0;
            const l = op.lost || 0;
            const p = w + l || 1;
            const svl = (1 - d / p) * 100;
            acc.push(
                Object.assign({}, Operators[curr], {
                    id: curr,
                    won: w,
                    lost: l,
                    kills: k,
                    deaths: d,
                    timePlayed: op.timePlayed || 0,
                    wlr: stats.getWinChanceRaw(op),
                    kdr: k / (d || 1),
                    kpr: k / p,
                    survivalRate: svl > 0 ? svl : 0,
                }),
            );
            return acc;
        }, []));

        state.operatorsShowMap = {};
        const opProgressions = attrs.progressions
            .map(prog => ({
                ops: prog.stats && prog.stats.operator,
                date: prog.created_at,
            }))
            .filter(x => x.ops)
            .reverse()
            .reduce((acc, day) => {
                Object.keys(day.ops).forEach(op => {
                    acc[op] = acc[op] || [];
                    acc[op].push({
                        date: stats.formatDate(day.date),
                        data: day.ops[op],
                    });
                });
                return acc;
            }, {});

        const getOp = id => opProgressions[id] || [];

        const getDelta = op => cb => getOp(op).reduce((acc, curr, i, arr) => acc.concat(cb(curr, arr[i - 1])), []);

        const getProgressionAverage = (op, cb) => {
            const series = getOp(op);
            return cb(series[0], series[series.length - 1]);
        };

        state.opgraphs = ops.reduce((acc, op) => {
            acc[op.id] = {};
            acc[op.id].kd = {
                type: "Line",
                title: "Kill/Death Ratio",
                data: {
                    labels: getOp(op.id).map(x => x.date),
                    series: [
                        {
                            name: "KD Ratio",
                            data: getDelta(op.id)(function(curr, prev) {
                                if (!prev) return null;
                                return (curr.data.kills - prev.data.kills) / (curr.data.deaths - prev.data.deaths);
                            }).map(x => {
                                if (Number.isFinite(x)) {
                                    return x;
                                }
                                return NaN;
                            }),
                            className: "opdaily",
                        },
                        {
                            name: "Average for past " + getOp(op.id).length + " days",
                            data: new Array(getOp(op.id).length).fill(
                                getProgressionAverage(op.id, function(start, end) {
                                    if (!start || !end) {
                                        debugger;
                                        return null;
                                    }
                                    return (start.data.kills - end.data.kills) / (start.data.deaths - end.data.deaths);
                                }),
                            ),
                            className: "opavg",
                        },
                    ],
                },
                options: {
                    axisX: {
                        labelInterpolationFnc,
                    },
                },
            };
            acc[op.id].wl = {
                type: "Line",
                title: "Round Win/Loss Ratio",
                data: {
                    labels: getOp(op.id).map(x => x.date),
                    series: [
                        {
                            name: "WL Ratio",
                            data: getDelta(op.id)(function(curr, prev) {
                                if (!prev) return null;
                                return (curr.data.won - prev.data.won) / (curr.data.lost - prev.data.lost);
                            }).map(x => {
                                if (Number.isFinite(x)) {
                                    return x;
                                }
                                return NaN;
                            }),
                            className: "opdaily",
                        },
                        {
                            name: "Average for past " + getOp(op.id).length + " days",
                            data: new Array(getOp(op.id).length).fill(
                                getProgressionAverage(op.id, function(start, end) {
                                    if (!start || !end) {
                                        return null;
                                    }
                                    return (start.data.won - end.data.won) / (start.data.lost - end.data.lost);
                                }),
                            ),
                            className: "opavg",
                        },
                    ],
                },
                options: {
                    axisX: {
                        labelInterpolationFnc,
                    },
                },
            };
            acc[op.id].playtime = {
                type: "Line",
                title: "Playtime (minutes)",
                data: {
                    labels: getOp(op.id).map(x => x.date),
                    series: [
                        {
                            data: getDelta(op.id)(function(curr, prev) {
                                if (!prev) return null;
                                return Math.abs(curr.data.timePlayed - prev.data.timePlayed) / 60;
                            }).map(x => {
                                if (Number.isFinite(x)) {
                                    return x;
                                }
                                return 0;
                            }),
                        },
                    ],
                },
                options: {
                    axisX: {
                        labelInterpolationFnc,
                    },
                },
            };
            return acc;
        }, {});

        state.toggleOp = op => {
            state.operatorsShowMap[op] = !state.operatorsShowMap[op];
        };

        state.onSort = stat => {
            if (stat in sorters) {
                if (sortProp === stat) {
                    isSortReversed = !isSortReversed;
                } else {
                    isSortReversed = false;
                    sortProp = stat;
                }
            }
        };
        state.onFilter = filter => {
            if (filter in filters) {
                filterProp = filter;
            }
        };
    },
    view({ attrs, state }) {
        return (
            <div className="opstab">
                <div className="opstab__controls card">
                    <div className="card-content">
                        <p>
                            <label htmlFor="filter">filter by</label>
                            <select name="filter" onchange={m.withAttr("value", state.onFilter)}>
                                {Object.keys(filters).map(x => <option value={x}>{x}</option>)}
                            </select>
                        </p>
                    </div>
                </div>
                <Fauxtable className="opstab__table">
                    <Fauxtable.Head>
                        <Fauxtable.Row>
                            {sorters.map(sorter => (
                                <Fauxtable.Heading
                                    className={state.getSorterClass(sorter)}
                                    onclick={() => state.setSort(sorter)}
                                >
                                    {sorter.label}
                                </Fauxtable.Heading>
                            ))}
                        </Fauxtable.Row>
                    </Fauxtable.Head>
                    <Fauxtable.Body>
                        {state.ops
                            .filter(state.filter)
                            .sort(state.sort)
                            .map(datum => (
                                <div>
                                    <Fauxtable.Row key={datum.id} className={datum.id}>
                                        <Fauxtable.Cell className="name">
                                        {/* <Fauxtable.Cell className="name" onclick={() => state.toggleOp(datum.id)}> */}
                                            <Icon glyph={GLYPHS[datum.id.toUpperCase()]} />
                                            {datum.name}
                                        </Fauxtable.Cell>
                                        <Fauxtable.Cell className="won">{datum.won || 0}</Fauxtable.Cell>
                                        <Fauxtable.Cell className="lost">{datum.lost || 0}</Fauxtable.Cell>
                                        <Fauxtable.Cell className="wlr">
                                            <Scale value={datum.wlr * 100} scale={SCALES.WL}>
                                                %
                                            </Scale>
                                        </Fauxtable.Cell>
                                        <Fauxtable.Cell className="kills">{datum.kills || 0}</Fauxtable.Cell>
                                        <Fauxtable.Cell className="deaths">{datum.deaths || 0}</Fauxtable.Cell>
                                        <Fauxtable.Cell className="kdr">
                                            <Scale value={datum.kdr} scale={SCALES.KD} />
                                        </Fauxtable.Cell>
                                        <Fauxtable.Cell className="kpr">
                                            <Scale value={datum.kpr} scale={SCALES.KPR} />
                                        </Fauxtable.Cell>
                                        <Fauxtable.Cell className="survival">
                                            <Scale value={datum.survivalRate} scale={SCALES.SVL}>
                                                %
                                            </Scale>
                                        </Fauxtable.Cell>
                                        <Fauxtable.Cell className="time">
                                            {stats.formatDuration(datum.timePlayed)}
                                        </Fauxtable.Cell>
                                    </Fauxtable.Row>
                                    {!state.operatorsShowMap[datum.id] ? (
                                        ""
                                    ) : (
                                        <div class="opstab__graphs">
                                            <div className="row">
                                                <div className="col">
                                                    <div>
                                                        <Chart {...state.opgraphs[datum.id].kd} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div>
                                                        <Chart {...state.opgraphs[datum.id].wl} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div>
                                                        <Chart {...state.opgraphs[datum.id].playtime} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </Fauxtable.Body>
                </Fauxtable>
            </div>
        );
    },
};
