import m from "mithril";
import Profilepic from "components/misc/Profilepic";

export default {
    view({attrs}) {
        return (
            <div className={`entry top-entry is-pos-${attrs.pos}`}>
                <div className="entry-img">
                    <Profilepic id={attrs.id} />
                    <div className="entry-place">{attrs.pos}</div>
                </div>
                <div className="entry-name">{attrs.name}</div>
                <div className="entry-value">{attrs.value}</div>
                <a href={`/player/${attrs.id}`} className="entry-link">view Profile</a>
            </div>
        );
    }
};