import * as m from "mithril";
import { Operators } from "lib/constants";
import * as stats from "lib/stats";
import "./opstab.scss";
import "./fauxtable.scss";

const sorters = {
    name: (a, b) => { return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)) },
    won: (a, b) => { return b.won - a.won },
    lost: (a, b) => { return b.lost - a.lost },
    wlr: (a, b) => { return stats.getWinChanceRaw(b) - stats.getWinChanceRaw(a) },
    kills: (a, b) => { return b.kills - a.kills },
    deaths: (a, b) => { return b.deaths - a.deaths },
    kdr: (a, b) => { return stats.getKillRatio(b) - stats.getKillRatio(a) },
    kpr: (a, b) => { return b.kpr - a.kpr },
    dpr: (a, b) => { return b.survivalRate - a.survivalRate },
    time: (a, b) => { return b.timePlayed - a.timePlayed },
}
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
        let sortProp = "name";
        let isSortReversed = false;

        state.sort = function (a, b) {
            const res = sorters[sortProp](a, b);
            return isSortReversed ? -res : res;
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
                            <div className="fauxtable-heading name" onclick={() => state.onSort("name")}>Name</div>
                            <div className="fauxtable-heading won" onclick={() => state.onSort("won")}>Rounds won</div>
                            <div className="fauxtable-heading lost" onclick={() => state.onSort("lost")}>Rounds lost</div>
                            <div className="fauxtable-heading wlr" onclick={() => state.onSort("wlr")}>Win ratio</div>
                            <div className="fauxtable-heading kills" onclick={() => state.onSort("kills")}>Kills</div>
                            <div className="fauxtable-heading deaths" onclick={() => state.onSort("deaths")}>Deaths</div>
                            <div className="fauxtable-heading kdr" onclick={() => state.onSort("kdr")}>KD Ratio</div>
                            <div className="fauxtable-heading kpr" onclick={() => state.onSort("kpr")}>Kills / Round</div>
                            <div className="fauxtable-heading survival" onclick={() => state.onSort("dpr")}>Survival rate</div>
                            <div className="fauxtable-heading time" onclick={() => state.onSort("time")}>Time played</div>
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
                                <div className="fauxtable-cell survival">{datum.survivalRate.toFixed(2)} %</div>
                                <div className="fauxtable-cell time">{stats.formatDuration(datum.timePlayed)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}