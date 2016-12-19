import m from "mithril";

export default {
    view({attrs}) {
        return (
            <div className={`entry is-pos-${attrs.pos}`}>
                <div className="entry-place">{attrs.pos}</div>
                <div className="entry-content">
                    <div className="entry-name">{attrs.name}</div>
                    <div className="entry-value">{attrs.value}</div>
                    <a href={`/player/${attrs.id}`} className="entry-link">view Profile</a>
                </div>
            </div>
        );
    }
};