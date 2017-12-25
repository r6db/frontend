import * as m from "mithril";
import Icon, { GLYPHS } from "components/misc/Icon";

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
                                    {x.value.attackers.map(x => <Icon glyph={GLYPHS[x.toUpperCase()]} />)}
                                </div>
                                <div className="opschart__defenders">
                                    {x.value.defenders.map(x => <Icon glyph={GLYPHS[x.toUpperCase()]} />)}
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </table>
        );
    },
};
