import * as m from "mithril";
import { Operators } from "lib/constants";
import * as stats from "lib/stats";
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
                            <div key={datum.id} className="fauxtable-row">
                                <div className="fauxtable-cell name">{datum.name}</div>
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
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}