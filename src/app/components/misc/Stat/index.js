import * as m from "mithril";
import "./stat.scss";

export default {
    view({ attrs, children }) {
        return (
            <div className="stat">
                <div className="stat-label">{attrs.label}</div>
                <div className="stat-value">{children}</div>
            </div>
        )
    }
}