import m from "mithril";
import Icon, { GLYPHS } from "components/misc/Icon";
import { Ranks, Regions } from "lib/constants";
import "./currentrank.scss";

export default {
    view({ attrs }) {
        return (
            <div class="player-currentrank">
                <Icon class="currentrank-icon" glyph={GLYPHS["RANK" + attrs.rank]} />
                <div class="currentrank-text">
                    <div class="currentrank-label">{Ranks[attrs.rank]}</div>
                    <div className="currentrank-region">{
                        attrs.region
                            ? Regions[attrs.region].label
                            : ""
                    }</div>
                </div>
            </div>
        );
    }
};