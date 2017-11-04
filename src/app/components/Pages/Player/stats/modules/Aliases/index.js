import * as m from "mithril";
import Alias from "components/pages/Profile/Player/Alias";
import "./aliases.scss";

export default {
    view({ attrs }) {
        return (
            <div className="player-module aliases">
                <div className="player-module-header">Alias History</div>
                <div className="aliases-list">
                    {
                        attrs.aliases.map(x => <Alias alias={x} />)
                    }
                </div>
            </div>
        )
    }
}