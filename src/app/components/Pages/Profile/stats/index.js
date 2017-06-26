import * as m from "mithril";
import RankOverview from "./modules/RankOverview";
import RankSeason from "./modules/RankSeason";
import Aliases from "./modules/Aliases";
import GameModes from "./modules/GameModes";
import StatOverview from "./modules/StatOverview";
import Charts from "./modules/Charts";

import "./statstab.scss";


export default {
    view({ attrs }) {
        return (
            <div className="statstab">
                <div className="statstab-sidebar">
                    <RankOverview {...attrs} />
                    <Aliases {...attrs} />
                </div>
                <div className="statstab-statarea">
                    <div className="statstab-center">
                        <StatOverview {...attrs} />
                        <RankSeason {...attrs} />
                        <Charts {...attrs} />
                    </div>
                    <div className="statstab-aside">
                        <GameModes {...attrs} />
                    </div>
                </div>
            </div>
        )
    }
}