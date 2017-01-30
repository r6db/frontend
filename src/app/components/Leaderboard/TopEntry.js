import m from "mithril";
import Profilepic from "components/misc/Profilepic";

export default {
    view({attrs}) {
        return (
            <div className={`entry top-entry is-pos-${attrs.pos}`}>
                <div className="entry-top">
                    <div className="entry-img">
                        <Profilepic id={attrs.id} />
                        <div className="entry-place">{attrs.pos}</div>
                    </div>
                </div>
                <a href={`/player/${attrs.id}`} className="entry-name">{attrs.name}</a>
                <div className="entry-rating">
                    <span className="entry-valuelabel">skill rating</span>
                    <div className="entry-value">
                        {attrs.value}
                    </div>
                </div>
            </div>
        );
    }
};