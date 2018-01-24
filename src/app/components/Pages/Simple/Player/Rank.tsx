import * as Inferno from "inferno";
import Icon, { GLYPHS } from "components/misc/Icon";

export default function SimpleRank(props) {
    const glyph = GLYPHS["RANK" + props.rank.rank];
    return (
        <div className="rank">
            <Icon className="rank-image" glyph={glyph} />
            <div className="rank-season">Season {props.rank.season}</div>
        </div>
    );
}
