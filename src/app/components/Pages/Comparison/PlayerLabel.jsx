import * as m from "mithril";

export default {
    view({ attrs }) {
        return (
            <div className="playerlabel">
                {attrs.name}
                <span className="playerlabel__remove" onclick={attrs.onRemove}>
                    ✖
                </span>
            </div>
        );
    },
};
