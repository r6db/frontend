import * as React from "react";
import * as get from "lodash/get";
import Icon, { GLYPHS } from "components/misc/Icon";
import { RANKS } from "lib/constants";
import "./rankoverview.scss";
import { FormattedMessage } from "react-intl";

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
                            ? "#" + (get(props, "placements.global", "-") + 1 + " Global")
                            : ""}
                </div>
                {/* <div className="globalrank__toppercentage">TODO: Calculate position</div> */}
            </div>
        </div>
    );
}

function CurrentRank(props) {
    return (
        <div className={`currentrank ${props.className || ""}`}>
            <div className="currentrank__region">{props.region}</div>
            <div className="currentrank__placement">
                {props.rank === 0 ? "Unranked" : typeof props.placement === "number" ? "#" + (props.placement + 1) : ""}
            </div>
        </div>
    );
}

export default function RankOverview(props) {
    if (props.level < 100) {
        return (
            <div className="playermodule rankoverview">
                <div className="rankoverview__isunderage">
                    <FormattedMessage id="player/rankingsUnlock" />
                </div>
            </div>
        );
    }
    return (
        <div className="playermodule rankoverview">
            <div className="rankoverview__global">
                <GlobalRank {...props} />
            </div>
            {get(props, "placements.global", null) !== null ? (
            <div className="rankoverview__regional">
                <div className="playermodule__divider" />
                <CurrentRank
                    key="rank-emea"
                    rank={get(props, "rank.emea.max_rank", 0)}
                    placement={get(props, "placements.emea", "-")}
                    region="Europe"
                />
                <div className="rankoverview__vertdivider" />
                <CurrentRank
                    key="rank-ncsa"
                    rank={get(props, "rank.ncsa.max_rank", 0)}
                    placement={get(props, "placements.ncsa", "-")}
                    region="America"
                />
                <div className="rankoverview__vertdivider" />
                <CurrentRank
                    key="rank-apac"
                    rank={get(props, "rank.apac.max_rank", 0)}
                    placement={get(props, "placements.apac", "-")}
                    region="Asia"
                />
            </div>
            ) : null }
        </div>
    );
}
