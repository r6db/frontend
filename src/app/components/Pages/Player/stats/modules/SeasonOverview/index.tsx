import * as React from "react";
import * as get from "lodash/get";
import Icon, { GLYPHS } from "components/misc/Icon";
import { RANKS, SEASONS } from "lib/constants";
import "./seasonoverview.scss";
import { FormattedMessage } from "react-intl";

export default function SeasonOverview(props) {
    if (props.pastRanks.every(x => x.max_rank === 0)) {
        return (
            <div className="playermodule seasonoverview">
                <div className="seasonoverview__noinfo">
                    <FormattedMessage id="player/noOldSeasonData" />
                </div>
            </div>
        );
    }
    const pr = props.pastRanks.filter(x => x.max_rank !== 0);
    return (
        <div className="playermodule seasonoverview">
            {pr.map(rank => (
                <div className={`pastrank season-${rank.season}`} key={rank.season}>
                    <Icon className="pastrank__icon" glyph={GLYPHS["RANK" + rank.max_rank]} />
                    <div className="pastrank__text">
                        <div className="pastrank__season">{SEASONS[rank.season].name}</div>
                        <div className="pastrank__rank">
                            {RANKS[rank.max_rank]}
                            <span className="pastrank__mmr">
                                {rank.max_mmr} <FormattedMessage id="mmr" />
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            <div className="seasonoverview__ubipls">
                <span>
                    <FormattedMessage id="player/shrug" />
                </span>
                <span>
                    <FormattedMessage id="player/ubifixpls" />
                </span>
            </div>
        </div>
    );
}
