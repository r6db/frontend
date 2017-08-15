import * as m from "mithril";
import { Operators } from "lib/constants";
import * as stats from "lib/stats";
import Chart from 'components/misc/Chart';
import "./opstab.scss";
import "./fauxtable.scss";

const sorters = [
    { key: "name", label: "name", fn: (a, b) => ((a.name < b.name ? -1 : (a.name > b.name ? 1 : 0))) },
    { key: "won", label: "won", fn: (a, b) => (b.won - a.won) },
    { key: "lost", label: "lost", fn: (a, b) => (b.lost - a.lost) },
    { key: "wlr", label: "win ratio", fn: (a, b) => (stats.getWinChanceRaw(b) - stats.getWinChanceRaw(a)) },
    { key: "kills", label: "kills", fn: (a, b) => (b.kills - a.kills) },
    { key: "deaths", label: "deaths", fn: (a, b) => (b.deaths - a.deaths) },
    { key: "kdr", label: "k/d ratio", fn: (a, b) => (stats.getKillRatio(b) - stats.getKillRatio(a)) },
    { key: "kpr", label: "kpr", fn: (a, b) => (b.kpr - a.kpr) },
    { key: "survival", label: "survival rate", fn: (a, b) => (b.survivalRate - a.survivalRate) },
    { key: "time", label: "time played", fn: (a, b) => (b.timePlayed - a.timePlayed) },
];
const filters = {
    "None": () => true,
    "Attackers": op => op.side === "Attack",
    "Defenders": op => op.side === "Defense",
    "GIGN": op => op.unit === "GIGN",
    "SAS": op => op.unit === "SAS",
    "GSG9": op => op.unit === "GSG9",
    "FBI": op => op.unit === "FBI",
    "SPEZNAS": op => op.unit === "SPEZNAS",
    "JTF-2": op => op.unit === "JTF-2",
    "SEALS": op => op.unit === "SEALS",
    "BOPE": op => op.unit === "BOPE",
    "SAT": op => op.unit === "SAT",
    "GEO": op => op.unit === "GEO",
}
export default {
    oninit({ attrs, state }) {

        let filterProp = "None";
        let sorter = sorters[0];
        let isSortReversed = false;

        state.getSorterClass = tester => {
            if(tester !== sorter) { return tester.key; }
            return isSortReversed
                ? tester.key + ' is-active is-reversed'
                : tester.key + ' is-active';
        };
        state.sort = function (a, b) {
            const res = sorter.fn(a, b);
            return isSortReversed ? -res : res;
        }
        state.setSort = newSorter => {
            if (newSorter === sorter) {
                isSortReversed = !isSortReversed;
            } else {
                isSortReversed = false;
                sorter = newSorter;
            }
        }
        state.filter = x => filters[filterProp](x)

        const ops = state.ops = Object.keys(attrs.stats.operator)
            .reduce((acc, curr) => {
                const op = attrs.stats.operator[curr];
                acc.push(Object.assign({}, op, Operators[curr],  {
                    id: curr,
                    wlr: stats.getWinChanceRaw(op),
                    kdr: (op.kills) / (op.deaths || 1),
                    kpr: (op.kills / ((op.won + op.lost) || 1)),
                    survivalRate: 100 - ((op.deaths / (op.won + op.lost)) * 100) || 0,
                }));
                return acc;
            }, []);

        state.operatorsShowMap = {};
        const opProgressions = attrs.progressions
            .map(prog => ({
                ops: prog.stats && prog.stats.operator,
                date: prog.created_at
            }))
            .filter(x => x.ops)
            .reverse()
            .reduce((acc, day) => {
                Object.keys(day.ops)
                    .forEach(op => {
                        acc[op] = acc[op] || [];
                        acc[op].push({
                            date: stats.formatDate(day.date),
                            data: day.ops[op]
                        });
                    });
                return acc;
            }, {});

        const getOp = id => (opProgressions[id] || []);

        const getDelta = op => cb => (opProgressions[op.id] || [])
            .reduce((acc, curr, i, arr) => acc.concat(cb(curr, arr[i - 1])), []);

        const getProgressionAverage = (op, cb) => {
            const series = getOp(op.id);
            return cb(series[0], series[series.length - 1]);
        };

        const labelInterpolationFnc = function (value, index, arr) {
            if (window.innerWidth > 640) {
                return index % 2 ? value : null;
            } else {
                const allowed = [0, (arr.length / 2) | 0, arr.length - 1]
                return allowed.indexOf(index) !== -1 ? value : null;
            }
        }

        state.opgraphs = ops.reduce((acc, op) => {
            acc[op.id] = {};
            acc[op.id].kd = {
                type: "Line",
                title: "Kill/Death Ratio",
                data: {
                    labels: getOp(op.id).map(x => x.date),
                    series: [{
                        name: "KD Ratio",
                        data: getDelta(op.id)(function (curr, prev) {
                            if (!prev) return null;
                            return (curr.data.kills - prev.data.kills) / (curr.data.deaths - prev.data.deaths);
                        }).map(x => {
                            return x;
                            if (Number.isFinite(x)) {
                                return x;
                            }
                            return NaN;
                        }),
                        className: "opdaily"
                    }, {
                        name: "Average for past " + getOp(op.id).length + " days",
                        data: new Array(getOp(op.id).length).fill(getProgressionAverage(op.id, function (start, end) {
                            if (!start || !end) {
                                return null;
                            }
                            return (start.data.kills - end.data.kills) / (start.data.deaths - end.data.deaths);
                        })),
                        className: "opavg"
                    }]
                },
                options: {
                    axisX: {
                        labelInterpolationFnc
                    }
                }
            };
            acc[op.id].wl = {
                type: "Line",
                title: "Round Win/Loss Ratio",
                data: {
                    labels: getOp(op.id).map(x => x.date),
                    series: [{
                        name: "WL Ratio",
                        data: getDelta(op.id)(function (curr, prev) {
                            if (!prev) return null;
                            return (curr.data.won - prev.data.won) / (curr.data.lost - prev.data.lost);
                        }).map(x => {
                            return x;
                            if (Number.isFinite(x)) {
                                return x;
                            }
                            return NaN;
                        }),
                        className: "opdaily"
                    }, {
                        name: "Average for past " + getOp(op.id).length + " days",
                        data: new Array(getOp(op.id).length).fill(getProgressionAverage(op.id, function (start, end) {
                            if (!start || !end) {
                                return null;
                            }
                            return (start.data.won - end.data.won) / (start.data.lost - end.data.lost);
                        })),
                        className: "opavg"
                    }]
                },
                options: {
                    axisX: {
                        labelInterpolationFnc
                    }
                }
            };
            acc[op.id].playtime = {
                type: "Line",
                title: "Playtime (minutes)",
                data: {
                    labels: getOp(op.id).map(x => x.date),
                    series: [{
                        data: getDelta(op.id)(function (curr, prev) {
                            if (!prev) return null;
                            return Math.abs(curr.data.timePlayed - prev.data.timePlayed) / 60;
                        }).map(x => {
                            return x;
                            if (Number.isFinite(x)) {
                                return x;
                            }
                            return 0;
                        })
                    }]
                },
                options: {
                    axisX: {
                        labelInterpolationFnc
                    }
                }
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
        }
        state.onFilter = filter => {
            if (filter in filters) {
                filterProp = filter;
            }

        }
    },
    view({ attrs, state }) {
        return (
            <div className="opstab">
                <div className="opstab-controls">
                    <p>
                        <label htmlFor="filter">filter by</label>
                        <select name="filter" onchange={m.withAttr('value', state.onFilter)}>
                            {Object.keys(filters).map(x => <option value={x}>{x}</option>)}
                        </select>
                    </p>
                </div>
                <div className="fauxtable operator-table">
                    <div className="fauxtable-head">
                        <div className="fauxtable-row">
                            {
                                sorters.map(sorter => (
                                    <div className={`fauxtable-heading ${state.getSorterClass(sorter)}`}
                                        onclick={() => state.setSort(sorter)}
                                    >
                                        {sorter.label}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="fauxtable-body">
                        {state.ops
                            .filter(state.filter)
                            .sort(state.sort)
                            .map(datum => (
                            <div>
                                <div key={datum.id} className="fauxtable-row">
                                    <div className="fauxtable-cell name" onclick={ () => state.toggleOp(datum.id) }>{datum.name}</div>
                                    <div className="fauxtable-cell won">{datum.won}</div>
                                    <div className="fauxtable-cell lost">{datum.lost}</div>
                                    <div className="fauxtable-cell wlr">{datum.wlr.toFixed(2)} %</div>
                                    <div className="fauxtable-cell kills">{datum.kills}</div>
                                    <div className="fauxtable-cell deaths">{datum.deaths}</div>
                                    <div className="fauxtable-cell kdr">{datum.kdr.toFixed(2)}</div>
                                    <div className="fauxtable-cell kpr">{datum.kpr.toFixed(2)}</div>
                                    <div className="fauxtable-cell survival">{datum.survivalRate.toFixed(2)}%</div>
                                    <div className="fauxtable-cell time">{stats.formatDuration(datum.timePlayed)}</div>
                                </div>
                                { !state.operatorsShowMap[datum.id] ? "" :
                                <div class="operator-graphs">
                                    <div className="row">
                                        <div className="col">
                                            <div><Chart { ...state.opgraphs[datum.id].kd }/></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div><Chart { ...state.opgraphs[datum.id].wl } /></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div><Chart { ...state.opgraphs[datum.id].playtime } /></div>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};
