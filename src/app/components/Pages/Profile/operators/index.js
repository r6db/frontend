import * as m from "mithril";
import { Operators } from "lib/constants";
import * as stats from "lib/stats";
import "./opstab.scss";
import "./fauxtable.scss";

const sorters = {
    "Name": (a, b) => { return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)) },
    "Rounds Won": (a, b) => { return b.won - a.won },
    "Rounds Lost": (a, b) => { return b.lost - a.lost },
    "Win ratio": (a, b) => { return stats.getWinChanceRaw(b) - stats.getWinChanceRaw(a) },
    "Kills": (a, b) => { return b.kills - a.kills },
    "Deaths": (a, b) => { return b.deaths - a.deaths },
    "KD Ratio": (a, b) => { return stats.getKillRatio(b) - stats.getKillRatio(a) },
    "Kills / Round": (a, b) => { return b.kpr - a.kpr },
    "Time played": (a, b) => { return b.timePlayed - a.timePlayed },
    "Survival rate": (a, b) => { return b.survivalRate - a.survivalRate },
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
        state.activeSort = "Name";
        state.activeFilter = "None";

        const ops = state.ops = Object.keys(attrs.stats.operator)
            .reduce((acc, curr) => {
                const op = attrs.stats.operator[curr];
                acc.push(Object.assign({}, op, Operators[curr],  {
                    id: curr,
                    wlr: stats.getWinChanceRaw(op),
                    kdr: (op.kills) / (op.deaths || 1),
                    kpr: (op.kills / ((op.won + op.lost) || 1)),
                    survivalRate: 100 - ((op.deaths / (op.won + op.lost)) * 100),
                }));
                return acc;
            }, []);

        state.onSortChange = (e) => {
            const val = e.target.value;
            if (val in sorters) {
                state.activeSort = val;
            }
        }
        state.onFilterChange = (e) => {
            const val = e.target.value;
            if (val in filters) {
                state.activeFilter = val;
            }
        }
    },
    view({ attrs, state }) {
        return (
            <div className="opstab">
                <div className="opstab-controls">
                    <p>
                        <label htmlFor="sort">sort by</label>
                        <select name="sort" onchange={state.onSortChange}>
                            {Object.keys(sorters).map(x => <option value={x}>{x}</option>)}
                        </select>
                    </p>
                    <p>
                        <label htmlFor="filter">filter by</label>
                        <select name="filter" onchange={state.onFilterChange}>
                            {Object.keys(filters).map(x => <option value={x}>{x}</option>)}
                        </select>
                    </p>
                </div>
                <div className="fauxtable operator-table">
                    <div className="fauxtable-head">
                        <div className="fauxtable-row">
                            <div className="fauxtable-heading name">Name</div>
                            <div className="fauxtable-heading won">Rounds won</div>
                            <div className="fauxtable-heading lost">Rounds lost</div>
                            <div className="fauxtable-heading wlr">Win ratio</div>
                            <div className="fauxtable-heading kills">Kills</div>
                            <div className="fauxtable-heading deaths">Deaths</div>
                            <div className="fauxtable-heading kdr">KD Ratio</div>
                            <div className="fauxtable-heading kpr">Kills / Round</div>
                            <div className="fauxtable-heading time">Time played</div>
                            <div className="fauxtable-heading survival">Survival rate</div>
                        </div>
                    </div>
                    <div className="fauxtable-body">
                        {state.ops
                            .filter(filters[state.activeFilter])
                            .sort(sorters[state.activeSort])
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
                                <div className="fauxtable-cell time">{stats.formatDuration(datum.timePlayed)}</div>
                                <div className="fauxtable-cell survival">{datum.survivalRate.toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}