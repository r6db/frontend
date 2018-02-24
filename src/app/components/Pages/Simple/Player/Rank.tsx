import * as React from "react";
import Icon, { GLYPHS } from "components/misc/Icon";

export default function SimpleRank(props) {
    const glyph = GLYPHS["RANK" + props.rank.max_rank];
    return (
        <div className="rank">
            <Icon className="rank-image" glyph={glyph} />
            <div className="rank-season">Season {props.rank.season}</div>
        </div>
    );
}
