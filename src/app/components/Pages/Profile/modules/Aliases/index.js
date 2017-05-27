import * as m from "mithril";
import Alias from "components/Pages/Detail/Player/Alias";
import "./aliases.scss";

export default {
    view({ attrs }) {
        return (
            <div className="profile-module aliases">
                <div className="profile-module-header">Aliases</div>
                <div className="profile-module-divider"></div>
                {
                    attrs.aliases.map(x => <Alias alias={x} />)
                }
            </div>
        )
    }
}