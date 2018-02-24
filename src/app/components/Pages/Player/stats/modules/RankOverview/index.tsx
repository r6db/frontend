import * as React from "react";
import * as get from "lodash/get";
import Icon, { GLYPHS } from "components/misc/Icon";
import { RANKS, SEASONS } from "lib/constants";
import "./rankoverview.scss";

function CurrentRank(props) {
    if (props.region === "Global") {
        return (
            <div className="currentrank">
                <div className="currentrank__icon">
                    <Icon glyph={GLYPHS["RANK0"]} />
                </div>
                <div className="currentrank__placement">FUCK</div>
                <div className="currentrank__region">{props.region}</div>
            </div>
        );
    }
    else {
        return (
            <div className={`currentrank ${props.className || ""}`}>
                <div className="currentrank__icon">
                    <Icon glyph={GLYPHS["RANK" + props.rank]} />
                </div>
                <div className="currentrank__placement">
                    {props.rank === 0
                        ? "N/A"
                        : typeof props.placement === "number"
                            ? "#" + (props.placement + 1)
                            : ""
                    }
                </div>
                <div className="currentrank__region">{props.region}</div>
            </div>
        );
    }
}

function GlobalRanking(props) {
    return (
        <div className={`globalrank ${props.className || ""}`}>
            <div className="globalrank__icon">
                <Icon glyph={GLYPHS["RANK" + props.rank]} />
            </div>
            <div className="globalrank__box">
                <div className="globalrank__rank">{RANKS[props.rank]}</div>
                <div className="globalrank__placement">
                    {props.rank === 0
                        ? "N/A"
                        : typeof props.placement === "number"
                            ? "#" + (props.placement + 1)
                            : ""
                    } Global
                </div>
                <div className="globalrank__toppercentage">TODO: Calculate position</div>
            </div>
        </div>
    );
}
function CurrentSeason(props) {
    if (props.level < 100) {
        return <div className="rankoverview__currentseason is-underage">rankings unlock at level 100</div>;
    } else if (get(props, "placements.global", null) === null) {
        return null;
    }
    return (
        <div className="rankoverview__currentseason">
            <div className="rankoverview__global">
                <GlobalRanking
                    key="rank-global"
                    rank={get(props, "pastRanks.0.rank", 0)}
                    show={true}
                    className="currentrank--global"
                    placement={get(props, "placements.global", "-")}
                    region="Global"
                />
            </div>
            <div className="playermodule__divider"></div>
            <div className="rankoverview__regional">
                <CurrentRank
                    key="rank-emea"
                    rank={get(props, "rank.emea.rank", 0)}
                    placement={get(props, "placements.emea", "-")}
                    region="Europe"
                />
                <div className="rankoverview__vertdivider"></div>
                <CurrentRank
                    key="rank-ncsa"
                    rank={get(props, "rank.ncsa.rank", 0)}
                    placement={get(props, "placements.ncsa", "-")}
                    region="America"
                />
                <div className="rankoverview__vertdivider"></div>
                <CurrentRank
                    key="rank-apac"
                    rank={get(props, "rank.apac.rank", 0)}
                    placement={get(props, "placements.apac", "-")}
                    region="Asia"
                />
            </div>
        </div>
    );
}

export default function PlayerRankOverview(props) {
    return (
        <div className="playermodule rankoverview">
            <CurrentSeason {...props} />
            <div className="playermodule__divider" />
            <div className="rankoverview__pastseason">
                {props.pastRanks.filter(x => x.season === props.rank.season || x.rank !== 0).map(rank => (
                    <div className={`pastrank season-${rank.season}`} key={rank.season}>
                        <Icon className="pastrank__icon" glyph={GLYPHS["RANK" + rank.max_rank]} />
                        <div className="pastrank__text">
                            <div className="pastrank__season">{SEASONS[rank.season].name}</div>
                            <div className="pastrank__rank">
                                {RANKS[rank.max_rank]}
                                <span className="pastrank__mmr">{rank.mmr} MMR</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="rankoverview__ubipls">
                    <span>¯\_(ツ)_/¯</span>
                    <span>waiting for UBI to fix old seasons</span>
                </div>
            </div>
        </div>
    );
}
