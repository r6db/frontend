import * as React from "react";
import { FormattedMessage } from "react-intl";
import Icon, { GLYPHS } from "components/misc/Icon";

export default function SimpleRank(props) {
    const glyph = GLYPHS["RANK" + props.rank.max_rank];
    return (
        <div className="rank">
            <Icon className="rank-image" glyph={glyph} />
            <div className="rank-season">
                <FormattedMessage id="player/season" values={{ season: props.rank.season }} />
            </div>
        </div>
    );
}
