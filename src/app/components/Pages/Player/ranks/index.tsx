import * as React from "react";
import "./rankstab.scss";
import { Ranks, regions } from "lib/constants";
import Icon, { GLYPHS } from "components/misc/Icon";
import Fauxtable from "components/misc/Fauxtable";

const sorters = [
    { key: "region", label: "region", fn: (a, b) => (a.region < b.region ? -1 : a.region > b.region ? 1 : 0) },
    { key: "season", label: "season", fn: (a, b) => b.season - a.season },
    { key: "max rank", label: "rank", fn: (a, b) => b.rank - a.rank },
    { key: "mmr", label: "mmr", fn: (a, b) => b.mmr - a.mmr },
    { key: "max_mmr", label: "max mmr", fn: (a, b) => b.max_mmr - a.max_mmr },
    { key: "skill_mean", label: "skill", fn: (a, b) => b.skill_mean - a.skill_mean },
    { key: "skill_stdev", label: "uncert.", fn: (a, b) => b.skill_stdev - a.skill_stdev },
    { key: "wins", label: "wins", fn: (a, b) => b.wins - a.wins },
    { key: "losses", label: "losses", fn: (a, b) => b.losses - a.losses },
    { key: "abandons", label: "abandons", fn: (a, b) => b.abandons - a.abandons },
    { key: "wlp", label: "w/l %", fn: (a, b) => getWLP(b) - getWLP(a) },
];

function getWLP(rank) {
    return rank.wins * 100 / (rank.wins + rank.abandons + rank.losses) || 0;
    //(obj.won * 100 / (obj.won + (obj.lost) || 1)).toFixed(2) + "%"
}
let sorter = sorters[1];
let isSortReversed = false;

export default class RanksTable extends React.Component<any, any> {
    constructor(props) {
        super(props);

        const ranks = props.seasonRanks.concat(props.rank).reduce((acc, rank) => {
            const emea = rank.emea;
            const apac = rank.apac;
            const ncsa = rank.ncsa;
            emea.region = "emea";
            apac.region = "apac";
            ncsa.region = "ncsa";
            return acc.concat(
                [emea, apac, ncsa].map(region => {
                    region.season = rank.season;
                    return region;
                }),
            );
        }, []);

        this.state = {
            sorter: sorters[1],
            isSortReversed: false,
            seasonFilter: "all",
            regionFilter: "all",
            showUnranked: false,
            ranks,
        };

        this.sort = this.sort.bind(this);
        this.filter = this.filter.bind(this);
    }

    onRegionFilter(regionFilter) {
        this.setState({ regionFilter });
    }
    onFilter(seasonFilter) {
        this.setState({ seasonFilter });
    }
    onShowUnranked(showUnranked) {
        this.setState({ showUnranked });
    }
    filter(x) {
        if (this.state.seasonFilter !== "all") {
            return x.season === Number.parseInt(this.state.seasonFilter);
        }
        if (this.state.regionFilter !== "all") {
            return x.region === this.state.regionFilter;
        }
        if (!this.state.showUnranked) {
            return x.rank !== 0;
        }
        return true;
    }
    getSeasonFilters() {
        return this.props.seasonRanks.concat(this.props.rank).map(rank => rank.season);
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
    setSort(sorter) {
        if (sorter === this.state.sorter) {
            this.setState({ isSortReversed: !this.state.isSortReversed });
        } else {
            this.setState({ sorter, isSortReversed: false });
        }
    }

    render() {
        return (
            <div className="rankstab">
                <div className="rankstab__controls">
                    <div className="row">
                        <p>
                            <label htmlFor="show-unranked">Show unranked</label>
                            <input
                                type="checkbox"
                                name="show-unranked"
                                onChange={e => this.onShowUnranked(e.target.checked)}
                            />
                        </p>
                        <p>
                            <label htmlFor="season-filter">Season</label>
                            <select name="season-filter" onChange={e => this.onFilter(e.target.value)}>
                                <option value="all">All</option>
                                {this.getSeasonFilters().map(x => (
                                    <option key={x} value={x}>
                                        {x}
                                    </option>
                                ))}
                            </select>
                        </p>
                        <p>
                            <label htmlFor="region-filter">Region</label>
                            <select name="region-filter" onChange={e => this.onRegionFilter(e.target.value)}>
                                <option value="all">All</option>
                                <option value="emea">Europe</option>
                                <option value="ncsa">America</option>
                                <option value="apac">Asia</option>
                            </select>
                        </p>
                    </div>
                </div>

                <Fauxtable.Table className="rankstab__table">
                    <Fauxtable.Head>
                        <Fauxtable.Row>
                            {sorters.map(sorter => (
                                <Fauxtable.Heading
                                    key={sorter.label}
                                    className={this.getSorterClass(sorter)}
                                    onClick={() => this.setSort(sorter)}
                                >
                                    {sorter.label}
                                </Fauxtable.Heading>
                            ))}
                        </Fauxtable.Row>
                    </Fauxtable.Head>
                    <Fauxtable.Body>
                        {this.state.ranks
                            .filter(this.filter)
                            .sort(this.sort)
                            .map(datum => (
                                <Fauxtable.Row key={datum.id} className="fauxtable__row">
                                    <Fauxtable.Cell className="fauxtable__cell region">
                                        {regions[datum.region]}
                                    </Fauxtable.Cell>
                                    <Fauxtable.Cell className="fauxtable__cell ">{datum.season}</Fauxtable.Cell>
                                    <Fauxtable.Cell className="fauxtable__cell rank">
                                        <Icon className="rank-image" glyph={GLYPHS["RANK" + datum.max_rank]} />
                                        <span className="ranks-text">
                                            {Ranks[datum.max_rank].replace("Unranked", "")}
                                        </span>
                                    </Fauxtable.Cell>
                                    <Fauxtable.Cell className="fauxtable__cell mmr">
                                        {datum.mmr.toFixed(2)}
                                    </Fauxtable.Cell>
                                    <Fauxtable.Cell className="fauxtable__cell max_mmr">
                                        {datum.max_mmr.toFixed(2)}
                                    </Fauxtable.Cell>
                                    <Fauxtable.Cell className="fauxtable__cell skill_mean">
                                        {datum.skill_mean.toFixed(2)}
                                    </Fauxtable.Cell>
                                    <Fauxtable.Cell className="fauxtable__cell skill_stdev">
                                        {datum.skill_stdev.toFixed(2)}
                                    </Fauxtable.Cell>
                                    <Fauxtable.Cell className="fauxtable__cell wins">{datum.wins}</Fauxtable.Cell>
                                    <Fauxtable.Cell className="fauxtable__cell losses">{datum.losses}</Fauxtable.Cell>
                                    <Fauxtable.Cell className="fauxtable__cell abandons">
                                        {datum.abandons}
                                    </Fauxtable.Cell>
                                    <Fauxtable.Cell className="fauxtable__cell wlp">
                                        {getWLP(datum).toFixed(2)} %
                                    </Fauxtable.Cell>
                                </Fauxtable.Row>
                            ))}
                    </Fauxtable.Body>
                </Fauxtable.Table>
            </div>
        );
    }
}
