import * as React from "react";
import * as get from "lodash/get";
import Icon, { GLYPHS } from "components/misc/Icon";
import { RANKS, SEASONS } from "lib/constants";
import "./rankoverview.scss";

function GlobalRank(props) {
    return (
        <div className="globalrank global">
            <div className="globalrank__icon">
                <Icon glyph={GLYPHS["RANK" + get(props, "pastRanks.0.max_rank", 0)]} />
            </div>
            <div className="globalrank__box">
                <div className="globalrank__rank">{RANKS[get(props, "pastRanks.0.max_rank", 0)]}</div>
                <div className="globalrank__placement">
                    {get(props, "pastRanks.0.max_rank", 0) === 0
                        ? "N/A"
                        : typeof get(props, "placements.global", "-") === "number"
                            ? "#" + (get(props, "placements.global", "-") + 1)
                            : ""
                    } Global
                </div>
                {/* <div className="globalrank__toppercentage">TODO: Calculate position</div> */}
            </div>
        </div>
    );
}

function CurrentRank(props) {
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

export default function RankOverview(props) {
    if (props.level < 100) {
        return <div className="rankoverview__isunderage">rankings unlock at level 100</div>;
    } else if (get(props, "placements.global", null) === null) {
        return null;
    }
    return (
        <div className="playermodule rankoverview">
            <div className="rankoverview__global">
                <GlobalRank {...props} />
            </div>
            <div className="playermodule__divider"></div>
            <div className="rankoverview__regional">
                <CurrentRank
                    key="rank-emea"
                    rank={get(props, "rank.emea.max_rank", 0)}
                    placement={get(props, "placements.emea", "-")}
                    region="Europe"
                />
                <div className="rankoverview__vertdivider"></div>
                <CurrentRank
                    key="rank-ncsa"
                    rank={get(props, "rank.ncsa.max_rank", 0)}
                    placement={get(props, "placements.ncsa", "-")}
                    region="America"
                />
                <div className="rankoverview__vertdivider"></div>
                <CurrentRank
                    key="rank-apac"
                    rank={get(props, "rank.apac.max_rank", 0)}
                    placement={get(props, "placements.apac", "-")}
                    region="Asia"
                />
            </div>
        </div>
    );
}
