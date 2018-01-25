import * as React from "react";
import Icon, { GLYPHS } from "components/misc/Icon";
import { formatDuration } from "lib/stats";

function OpIcon(props) {
    return (
        <div className="opschart__icon">
            <Icon glyph={GLYPHS[props.id.toUpperCase()]} />
            <span>{formatDuration(props.data.timePlayed)}</span>
        </div>
    );
}

export default function OpsChart(props) {
    return (
        <table className="opschart">
            <tbody>
                {props.data.map(x => (
                    <tr key={x.label} className="opschart__player">
                        <td>{x.label}</td>
                        <td>
                            <div className="opschart__ops">
                                <div className="opschart__attackers">
                                    {x.value.attackers.map(op => <OpIcon key={op} id={op} data={x.meta[op]} />)}
                                </div>
                                <div className="opschart__defenders">
                                    {x.value.defenders.map(op => <OpIcon key={op} id={op} data={x.meta[op]} />)}
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
