import * as React from "react";
import * as get from "lodash/get";
import Icon, { GLYPHS } from "components/misc/Icon";
import { RANKS, SEASONS } from "lib/constants";
import "./rankoverview.scss";

function CurrentRank(props) {
    if (props.rank === 0 && !props.show) {
        return null;
    }
    return (
        <div className="currentrank">
            <div className="currentrank__icon">
                <Icon glyph={GLYPHS["RANK" + props.rank]} />
            </div>
            <div className="currentrank__placement">
                {typeof props.placement === "number" ? "#" + (props.placement + 1) : ""}
            </div>
            <div className="currentrank__region">{props.region}</div>
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
            <CurrentRank
                key="rank-global"
                rank={get(props, "pastRanks.0.rank", 0)}
                show={true}
                placement={get(props, "placements.global", "-")}
                region="Global"
            />
            <CurrentRank
                key="rank-emea"
                rank={get(props, "rank.emea.rank", 0)}
                placement={get(props, "placements.emea", "-")}
                region="Europe"
            />
            <CurrentRank
                key="rank-ncsa"
                rank={get(props, "rank.ncsa.rank", 0)}
                placement={get(props, "placements.ncsa", "-")}
                region="America"
            />
            <CurrentRank
                key="rank-apac"
                rank={get(props, "rank.apac.rank", 0)}
                placement={get(props, "placements.apac", "-")}
                region="Asia"
            />
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
