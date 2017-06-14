import * as m from "mithril";
import IdCard from "./modules/IdCard";
import RankOverview from "./modules/RankOverview";
import RankSeason from "./modules/RankSeason";
import Aliases from "./modules/Aliases";
import GameModes from "./modules/GameModes";
import StatOverview from "./modules/StatOverview";
import "./statstab.scss";


export default {
    view({ attrs }) {
        return (
            <div className="statstab">
                <div className="statstab-sidebar">
                    <IdCard {...attrs} />
                    <RankOverview {...attrs} />
                    <Aliases {...attrs} />
                </div>
                <div className="statstab-statarea">
                    <div className="statstab-center">
                        <StatOverview {...attrs} />
                        <RankSeason {...attrs} />
                    </div>
                    <div className="statstab-aside">
                        <GameModes {...attrs} />
                    </div>
                </div>
            </div>
        )
    }
}