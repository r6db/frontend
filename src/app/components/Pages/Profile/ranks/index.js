import * as m from "mithril";
import "./rankstab.scss";
import {Ranks} from "lib/constants";

import Icon, { GLYPHS } from "components/misc/Icon";

const sorters = [
    { key: "region", label: "region", fn: (a, b) => ((a.region < b.region ? -1 : (a.region > b.region ? 1 : 0))) },
    { key: "season", label: "season", fn: (a, b) => (b.season - a.season) },
    { key: "rank", label: "rank", fn: (a, b) => (b.rank - a.rank) },
    { key: "mmr", label: "mmr", fn: (a, b) => (b.mmr - a.mmr) },
    { key: "max_mmr", label: "max_mmr", fn: (a, b) => (b.max_mmr - a.max_mmr) },
    { key: "skill_stdev", label: "skill_stdev", fn: (a, b) => (b.skill_stdev - a.skill_stdev) },
    { key: "skill_mean", label: "skill_mean", fn: (a, b) => (b.skill_mean - a.skill_mean) },
    { key: "wins", label: "wins", fn: (a, b) => (b.wins - a.wins) },
    { key: "losses", label: "losses", fn: (a, b) => (b.losses - a.losses) },
    { key: "abandons", label: "abandons", fn: (a, b) => (b.abandons - a.abandons) },
    { key: "wlp", label: "w/l %", fn: (a, b) => (getWLP(b) - getWLP(a)) }
];

function getRank(rank) {
    const glyph = GLYPHS["RANK" + rank];
    return <div>
        <Icon className="rank-image" glyph={glyph} />
        <span>{Ranks[rank].replace("Unranked", "")}</span>
    </div>;
}

function getWLP(rank) {
    console.log(rank.wins, rank.losses, rank.abandons);
    return rank.wins * 100/ (rank.wins + rank.abandons + rank.losses) || 0;
    //(obj.won * 100 / (obj.won + (obj.lost) || 1)).toFixed(2) + "%"
}
let sorter = sorters[1];
let isSortReversed = false;
export default {
    view({ attrs, state }) {
        state.filter = x => x;
        state.ranks = attrs.seasonRanks.concat(attrs.rank)
            .reduce((acc, rank) => {
                const emea = rank.emea;
                const apac = rank.apac;
                const ncsa = rank.ncsa;
                emea.region = 'emea';
                apac.region = 'apac';
                ncsa.region = 'ncsa';
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
                ? tester.key + ' is-active is-reversed'
                : tester.key + ' is-active';
        };
        state.sort = function (a, b) {
            const res = sorter.fn(a, b);
            return isSortReversed ? -res : res;
        }
        state.setSort = newSorter => {
            console.log(sorter);
            if (newSorter === sorter) {
                isSortReversed = !isSortReversed;
            } else {
                isSortReversed = false;
                sorter = newSorter;
            }
        }
        console.log(attrs);
        return <div className="rankstab">
            <div className="rankstab-controls">
                <p>
                    <label htmlFor="filter">Season</label>
                    <select name="filter" onchange={m.withAttr('value', state.onFilter)}>
                        {state.getSeasonFilters().map(x => <option value={x}>Season {x}</option>)}
                    </select>
                </p>
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
                                    <div className="fauxtable-cell region">{datum.region}</div>
                                    <div className="fauxtable-cell season">{datum.season}</div>
                                    <div className="fauxtable-cell rank">{getRank(datum.rank)}</div>
                                    <div className="fauxtable-cell mmr">{datum.mmr.toFixed(2)}</div>
                                    <div className="fauxtable-cell max_mmr">{datum.max_mmr.toFixed(2)}</div>
                                    <div className="fauxtable-cell skill_stdev">{datum.skill_stdev.toFixed(2)}</div>
                                    <div className="fauxtable-cell skill_mean">{datum.skill_mean.toFixed(2)}</div>
                                    <div className="fauxtable-cell wins">{datum.wins}</div>
                                    <div className="fauxtable-cell losses">{datum.losses}</div>
                                    <div className="fauxtable-cell abandons">{datum.abandons}</div>
                                    <div className="fauxtable-cell wlr">{getWLP(datum).toFixed(2)} %</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    }
};
