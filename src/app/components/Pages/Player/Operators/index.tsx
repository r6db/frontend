import * as React from "react";
import { FormattedMessage } from "react-intl";
import { OPERATORS } from "lib/constants";
import * as stats from "lib/stats";
import Dropdown from "components/misc/Dropdown";
import Icon, { GLYPHS } from "components/misc/Icon";
import Scale, { SCALES } from "components/misc/Scale";
import Fauxtable from "components/misc/Fauxtable";
import "./opstab.scss";

const sorters = [
    { key: "name", label: "player/sorter/name", fn: (a, b) => (a.name || "").localeCompare(b.name) },
    { key: "won", label: "player/sorter/won", fn: (a, b) => b.won - a.won },
    { key: "lost", label: "player/sorter/lost", fn: (a, b) => b.lost - a.lost },
    {
        key: "wlr",
        label: "player/sorter/wlr",
        fn: (a, b) => stats.getWinChanceRaw(b) - stats.getWinChanceRaw(a)
    },
    { key: "kills", label: "player/sorter/kills", fn: (a, b) => b.kills - a.kills },
    { key: "deaths", label: "player/sorter/deaths", fn: (a, b) => b.deaths - a.deaths },
    {
        key: "kdr",
        label: "player/sorter/kdr",
        fn: (a, b) => (stats.getKillRatioRaw(b) - stats.getKillRatioRaw(a)).toFixed(2)
    },
    { key: "kpr", label: "player/sorter/kpr", fn: (a, b) => b.kpr - a.kpr },
    {
        key: "survival",
        label: "player/sorter/survival",
        fn: (a, b) => b.survivalRate - a.survivalRate
    },
    {
        key: "time",
        label: "player/sorter/time",
        fn: (a, b) => b.timePlayed - a.timePlayed
    }
];
const filters = {
    None: () => true,
    Attackers: op => op.side === "Attack",
    Defenders: op => op.side === "Defense",
    Recruits: op => op.side === "Recruit",
    GIGN: op => op.unit === "GIGN",
    SAS: op => op.unit === "SAS",
    GSG9: op => op.unit === "GSG9",
    FBI: op => op.unit === "FBI",
    SPETSNAZ: op => op.unit === "SPETSNAZ",
    "JTF-2": op => op.unit === "JTF-2",
    SEALS: op => op.unit === "SEALS",
    BOPE: op => op.unit === "BOPE",
    SAT: op => op.unit === "SAT",
    GEO: op => op.unit === "GEO",
    GROM: op => op.unit === "GROM",
    SDU: op => op.unit === "SDU",
    SMB: op => op.unit === "SMB",
    CBRN: op => op.unit === "CBRN",
    GIS: op => op.unit === "GIS"
};

export default class OperatorTab extends React.PureComponent<any, any> {
    constructor(props) {
        super(props);

        const ops = Object.keys(props.stats.operator).reduce((acc, curr) => {
            const op = props.stats.operator[curr];
            const k = op.kills || 0;
            const d = op.deaths || 0;
            const w = op.won || 0;
            const l = op.lost || 0;
            const p = w + l || 1;
            const svl = (1 - d / p) * 100;
            acc.push(
                Object.assign({}, OPERATORS[curr], {
                    id: curr,
                    won: w,
                    lost: l,
                    kills: k,
                    deaths: d,
                    timePlayed: op.timePlayed || 0,
                    wlr: stats.getWinChanceRaw(op),
                    kdr: k / (d || 1),
                    kpr: k / p,
                    survivalRate: svl > 0 ? svl : 0
                })
            );
            return acc;
        }, []);

        const operatorsShowMap = {};
        const opProgressions = props.progressions
            .map(prog => ({
                ops: prog.stats && prog.stats.operator,
                date: prog.created_at
            }))
            .filter(x => x.ops)
            .reverse()
            .reduce((acc, day) => {
                Object.keys(day.ops).forEach(op => {
                    acc[op] = acc[op] || [];
                    acc[op].push({
                        date: stats.formatDate(day.date),
                        data: day.ops[op]
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

        this.state = {
            filterProp: "None",
            sorter: sorters[0],
            isSortReversed: false,
            operatorsShowMap,
            ops
        };

        this.sort = this.sort.bind(this);
        this.filter = this.filter.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    getSorterClass(tester) {
        if (tester !== this.state.sorter) {
            return tester.key;
        }
        return this.state.isSortReversed ? tester.key + " is-active is-reversed" : tester.key + " is-active";
    }
    sort(a, b) {
        const res = this.state.sorter.fn(a, b);
        return this.state.isSortReversed ? -res : res;
    }
    setSort(newSorter) {
        if (newSorter === this.state.sorter) {
            this.setState({ isSortReversed: !this.state.isSortReversed });
        } else {
            this.setState({
                sorter: newSorter,
                isSortReversed: false
            });
        }
    }
    filter(x) {
        return filters[this.state.filterProp](x);
    }

    toggleOp(op) {
        const opsMap = this.state.operatorsShowMap;
        opsMap[op] = !opsMap[op];
        this.setState({ operatorsShowMap: opsMap });
    }

    setFilter(filterProp) {
        this.setState({ filterProp });
    }

    render() {
        return (
            <div className="opstab">
                <div className="opstab__controls card">
                    <div className="card-content">
                        <Dropdown
                            label={<FormattedMessage id="player/filterby" />}
                            options={Object.keys(filters).map(f => ({
                                value: f
                            }))}
                            action={this.setFilter}
                        />
                    </div>
                </div>
                <Fauxtable.Table className="opstab__table">
                    <Fauxtable.Head>
                        <Fauxtable.Row>
                            {sorters.map(sorter => (
                                <Fauxtable.Heading
                                    key={sorter.label}
                                    className={this.getSorterClass(sorter)}
                                    onClick={() => this.setSort(sorter)}
                                >
                                    <FormattedMessage id={sorter.label} />
                                </Fauxtable.Heading>
                            ))}
                        </Fauxtable.Row>
                    </Fauxtable.Head>
                    <Fauxtable.Body>
                        {this.state.ops
                            .filter(this.filter)
                            .sort(this.sort)
                            .map(datum => (
                                <div key={datum.id}>
                                    <Fauxtable.Row className={datum.id}>
                                        <Fauxtable.Cell className="name" onClick={() => this.toggleOp(datum.id)}>
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
                                    {!this.state.operatorsShowMap[datum.id] ? null : (
                                        <div className="opstab__graphs">{/* kd/wl/playtime charts */}</div>
                                    )}
                                </div>
                            ))}
                    </Fauxtable.Body>
                </Fauxtable.Table>
            </div>
        );
    }
}
