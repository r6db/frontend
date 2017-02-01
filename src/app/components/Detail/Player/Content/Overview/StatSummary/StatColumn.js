import m from "mithril";

export default {
    view: ({attrs, children}) => (
        <div className="stat-column">
            <table>{children}</table>
        </div>
    )
};