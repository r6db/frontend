import * as m from "mithril";
import "./rankstab.scss";
import {Ranks, regions} from "lib/constants";
import Icon, { GLYPHS } from "components/misc/Icon";

const sorters = [
    { key: "region", label: "region", fn: (a, b) => ((a.region < b.region ? -1 : (a.region > b.region ? 1 : 0))) },
    { key: "season", label: "season", fn: (a, b) => (b.season - a.season) },
    { key: "max rank", label: "rank", fn: (a, b) => (b.rank - a.rank) },
    { key: "mmr", label: "mmr", fn: (a, b) => (b.mmr - a.mmr) },
    { key: "max_mmr", label: "max mmr", fn: (a, b) => (b.max_mmr - a.max_mmr) },
    { key: "skill_mean", label: "skill", fn: (a, b) => (b.skill_mean - a.skill_mean) },
    { key: "skill_stdev", label: "uncert.", fn: (a, b) => (b.skill_stdev - a.skill_stdev) },
    { key: "wins", label: "wins", fn: (a, b) => (b.wins - a.wins) },
    { key: "losses", label: "losses", fn: (a, b) => (b.losses - a.losses) },
    { key: "abandons", label: "abandons", fn: (a, b) => (b.abandons - a.abandons) },
    { key: "wlp", label: "w/l %", fn: (a, b) => (getWLP(b) - getWLP(a)) }
];

function getWLP(rank) {
    return rank.wins * 100/ (rank.wins + rank.abandons + rank.losses) || 0;
    //(obj.won * 100 / (obj.won + (obj.lost) || 1)).toFixed(2) + "%"
}
let sorter = sorters[1];
let isSortReversed = false;
export default {
    oninit({ attrs, state }) {
        let seasonFilter = "all";
        let regionFilter = "all";
        let showUnranked = false;
        state.onRegionFilter = x => regionFilter = x;
        state.onFilter = x => seasonFilter = x;
        state.onShowUnranked = x => showUnranked = x;
        state.filter = x => {
            if (seasonFilter !== "all") {
                if (x.season !== parseInt(seasonFilter)) {
                    return false;
                }
            }
            if (regionFilter !== "all") {
                if (x.region !== regionFilter) {
                    return false;
                }
            }
            if (!showUnranked) {
                return x.rank !== 0;
            }
            return true;
        };
        state.ranks = attrs.seasonRanks.concat(attrs.rank)
            .reduce((acc, rank) => {
                const emea = rank.emea;
                const apac = rank.apac;
                const ncsa = rank.ncsa;
                emea.region = "emea";
                apac.region = "apac";
                ncsa.region = "ncsa";
                return acc.concat([emea, apac, ncsa].map(region => {
                    region.season = rank.season;
                    return region;
                }));
            }, []);
        state.getSeasonFilters = () => attrs.seasonRanks
                .concat(attrs.rank)
                .map(rank => rank.season);
        state.getSorterClass = tester => {
            if (tester !== sorter) { return tester.key; }
            return isSortReversed
                ? tester.key + " is-active is-reversed"
                : tester.key + " is-active";
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
        };
    },
    view({ attrs, state }) {
        return <div className="rankstab">
            <div className="rankstab-controls card">
                <div className="card-content">
                    <p>
                        <label htmlFor="show-unranked">Show unranked</label>
                        <input type="checkbox" name="show-unranked" onchange={m.withAttr("checked", state.onShowUnranked)} />
                    </p>
                    <p>
                        <label htmlFor="season-filter">Season</label>
                        <select name="season-filter" onchange={m.withAttr("value", state.onFilter)}>
                            <option value="all">All</option>
                            {state.getSeasonFilters().map(x => <option value={x}>{x}</option>)}
                        </select>
                    </p>
                    <p>
                        <label htmlFor="regionFilter">Region</label>
                        <select name="regionFilter" onchange={m.withAttr("value", state.onRegionFilter)}>
                            <option value="all">All</option>
                            <option value="emea">Europe, Africa & M.East</option>
                            <option value="ncsa">America</option>
                            <option value="apac">Asia</option>
                        </select>
                    </p>
                </div>
            </div>

            <div className="fauxtable ranks-table">
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
                    {state.ranks
                        .filter(state.filter)
                        .sort(state.sort)
                        .map(datum => (
                            <div>
                                <div key={datum.id} className="fauxtable-row">
                                    <div className="fauxtable-cell region">{regions[datum.region]}</div>
                                    <div className="fauxtable-cell ">{datum.season}</div>
                                    <div className="fauxtable-cell rank">
                                        <Icon className="rank-image" glyph={GLYPHS["RANK" + datum.max_rank]} />
                                        <span class="ranks-text">{Ranks[datum.max_rank].replace("Unranked", "")}</span>
                                    </div>
                                    <div className="fauxtable-cell mmr">{datum.mmr.toFixed(2)}</div>
                                    <div className="fauxtable-cell max_mmr">{datum.max_mmr.toFixed(2)}</div>
                                    <div className="fauxtable-cell skill_mean">{datum.skill_mean.toFixed(2)}</div>
                                    <div className="fauxtable-cell skill_stdev">{datum.skill_stdev.toFixed(2)}</div>
                                    <div className="fauxtable-cell wins">{datum.wins}</div>
                                    <div className="fauxtable-cell losses">{datum.losses}</div>
                                    <div className="fauxtable-cell abandons">{datum.abandons}</div>
                                    <div className="fauxtable-cell wlp">{getWLP(datum).toFixed(2)} %</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    }
};
