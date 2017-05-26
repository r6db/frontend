import * as m from "mithril";
import "./profile.scss";

export default {
    view({ attrs }) {
        return (
            <div className={`profile ${attrs.id}`}>
                <div className="profile-left">left</div>
                <div className="profile-center">center</div>
                <div className="profile-right">right</div>
            </div>
        )
    }
}