import m from "mithril";
import { fmtD } from "lib/format";
import "./operator.scss";

export default {
    view: ({ attrs }) => (
        <tr className={(attrs.className || "")}>
            <td className="operatorstats-name">{attrs.name}</td>
            <td className="operatorstats-time">{fmtD(attrs.timePlayed)}</td>
            <td className="operatorstats-wins">
                {attrs.won}
            </td>
            <td className="operatorstats-losses">
                {attrs.lost}
            </td>
            <td className="operatorstats-kills">
                {attrs.kills}
            </td>
            <td className="operatorstats-deaths">
                {attrs.deaths}
            </td>
        </tr>
    )
};