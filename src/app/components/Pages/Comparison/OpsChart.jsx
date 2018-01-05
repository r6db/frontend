import * as m from "mithril";
import Icon, { GLYPHS } from "components/misc/Icon";
import { formatDuration } from "lib/stats";

function getIcon(id, data) {
    return (
        <div className="opschart__icon">
            <Icon glyph={GLYPHS[id.toUpperCase()]} />
            <span>{formatDuration(data.timePlayed)}</span>
        </div>
    );
}

export default {
    view({ attrs }) {
        return (
            <table className="opschart">
                {attrs.data.map(x => (
                    <tr className="opschart__player">
                        <td>{x.label}</td>
                        <td>
                            <div className="opschart__ops">
                                <div className="opschart__attackers">
                                    {x.value.attackers.map(op => getIcon(op, x.meta[op]))}
                                </div>
                                <div className="opschart__defenders">
                                    {x.value.defenders.map(op => getIcon(op, x.meta[op]))}
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </table>
        );
    },
};
