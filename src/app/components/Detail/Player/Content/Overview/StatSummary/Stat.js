import m from "mithril";

export default {
    view: ({attrs}) => (
        <tr className="stat">
            <td className="stat-label">{attrs.label}</td>
            <td className="stat-value">{attrs.value}</td>
        </tr>
    )
};