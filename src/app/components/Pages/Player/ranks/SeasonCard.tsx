import * as React from "react";
import "./seasoncard.scss";
import { SEASONS, RANKS, REGIONS } from "lib/constants";
import Icon, { GLYPHS } from "components/misc/Icon";
import Stat from "components/misc/Stat";
import { getRankWinChance } from "lib/stats";

interface SeasonStats {
    wins: number;
    losses: number;
    abandons: number;
    mmr: number;
    max_mmr: number;
    rank: number;
    max_rank: number;
    skill_mean: number;
    skill_stdev: number;
}
interface RegionStatsProps extends SeasonStats {
    label: string;
    collapsed: boolean;
}
interface ISeasonCardProps {
    season: number;
    apac: SeasonStats;
    emea: SeasonStats;
    ncsa: SeasonStats;
    collapsed: boolean;
}

interface ISeasonCardState {
    collapsed: boolean;
}

export default class SeasonCard extends React.Component<ISeasonCardProps, ISeasonCardState> {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: this.props.collapsed || false
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        const img = SEASONS[this.props.season].cover;
        return (
            <div
                className={`seasoncard seasoncard--season-${this.props.season} ${
                    this.state.collapsed ? "seasoncard--collapsed" : ""
                }`}
                onClick={this.toggle}
            >
                <img
                    className="seasoncard__image"
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: 'url("' + img.placeholder + '")'
                    }}
                    src={img.placeholder}
                    srcSet={img.srcSet}
                />

                <div className="seasoncard__content">
                    <div className="seasoncard__season">
                        <Icon glyph={SEASONS[this.props.season].logo} />
                    </div>
                    <div className="seasoncard__regions">
                        <div className="seasoncard__regionsrow">
                            <RegionStats collapsed={this.state.collapsed} label={REGIONS.emea} {...this.props.emea} />
                            <RegionStats collapsed={this.state.collapsed} label={REGIONS.ncsa} {...this.props.ncsa} />
                            <RegionStats collapsed={this.state.collapsed} label={REGIONS.apac} {...this.props.apac} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function RegionStats(region: RegionStatsProps) {
    if (region.rank === 0) {
        return (
            <div className="regionstats">
                <header className="regionstats__header">
                    <div className="regionstats__headertext">
                        <div className="regionstats__region">{region.label}</div>
                        <div className="regionstats__rank">Unranked</div>
                    </div>
                    <Icon className="regionstats__rankicon" glyph={GLYPHS["RANK" + 0]} />
                </header>
                <div className="regionstats__stats regionstats__stats--empty">
                    <div className="regionstats__emptyindicator" />
                </div>
            </div>
        );
    }
    return (
        <div className="regionstats">
            <header className="regionstats__header">
                <div className="regionstats__headertext">
                    <div className="regionstats__region">{region.label}</div>
                    <div className="regionstats__rank">{RANKS[region.max_rank]}</div>
                </div>
                <div className="regionstats__ranks">
                    <Icon className="regionstats__rankicon" glyph={GLYPHS["RANK" + region.rank]} />
                    <span>max</span>
                    <Icon className="regionstats__maxrankicon" glyph={GLYPHS["RANK" + region.max_rank]} />
                </div>
            </header>
            <div className="regionstats__stats">
                {/*
            <Stat label="rank">{RANKS[region.rank]}</Stat>
            <Stat label="max rank">{RANKS[region.max_rank]}</Stat>
            */}
                <Stat label="MMR">{region.mmr.toFixed(2)}</Stat>
                <Stat label="max MMR">{region.max_mmr.toFixed(2)}</Stat>
                <Stat label="won">{region.wins}</Stat>
                <Stat label="lost">{region.losses}</Stat>
                <Stat label="abandoned">{region.abandons}</Stat>
                <Stat label="win %">{getRankWinChance(region)}</Stat>
            </div>
        </div>
    );
}
