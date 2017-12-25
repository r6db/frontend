import * as m from "mithril";
import "./stat.scss";

export default {
    view({ attrs, children }) {
        return (
            <div className="stat">
                <div className="stat__value">{children}</div>
                <div className="stat__label">{attrs.label}</div>
            </div>
        );
    },
};
