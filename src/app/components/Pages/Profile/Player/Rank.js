import * as m from "mithril";
import Icon, { GLYPHS } from "components/misc/Icon";

export default {
    view({ attrs }) {
        const glyph = GLYPHS["RANK" + attrs.rank.rank];
        return (
            <div className="rank">
                <Icon className="rank-image" glyph={glyph} />
                <div className="rank-season">Season {attrs.rank.season}</div>
            </div>
        );
    }
};
