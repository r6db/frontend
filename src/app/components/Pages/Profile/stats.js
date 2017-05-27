import * as m from "mithril";
import IdCard from "./modules/IdCard";
import RankOverview from "./modules/RankOverview";
import Aliases from "./modules/Aliases";
import "./profile.scss";

export default {
    view({ attrs }) {
        return (
            <div className={`profile ${attrs.id}`}>
                <div className="profile-sidebar">
                    <IdCard {...attrs} />
                    <RankOverview {...attrs} />
                    <Aliases {...attrs} />
                </div>
                <div className="profile-statarea">
                    <div className="profile-center">
                        <div className="profile-module">
                            Stats and stuff?
                        </div>
                        <div className="profile-module">
                            past Matches? ubi pls
                        </div>
                    </div>
                    <div className="profile-aside">
                        <div className="profile-module">
                            ranked season - region breakdown?
                        </div>
                        <div className="profile-module">
                            favourite operators?
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}