import m from "mithril";

export default {
    view: ({attrs}) => (
        <div className="playday-stat">
            <div className="stat-label">{attrs.label}</div>
            <div className="stat-value">{attrs.value}</div>
        </div>
    )
};