import * as m from "mithril";
import Alias from "components/Pages/Detail/Player/Alias";
import "./aliases.scss";

export default {
    view({ attrs }) {
        return (
            <div className="profile-module aliases">
                <div className="profile-module-header">Alias History</div>
                <div className="aliases-list">
                    {
                        attrs.aliases.map(x => <Alias alias={x} />)
                    }
                </div>
            </div>
        )
    }
}