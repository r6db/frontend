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
        if (!attrs.stats || !attrs.rank){
            return null;
        }
        return (
            <div className="statstab">
                <div className="statstab-sidebar">
                    <RankOverview {...attrs} />
                    {attrs.aliases && attrs.aliases.length > 1
                        ? <Aliases {...attrs} />
                        : null }
                </div>
                <div className="statstab-statarea">
                    <div className="statstab-center">
                        {attrs.stats ? <StatOverview {...attrs} /> : null}
                        <RankSeason {...attrs} />
                        {attrs.stats ? <Charts {...attrs} /> : null}
                    </div>
                    <div className="statstab-aside">
                        {attrs.stats ? <GameModes {...attrs} /> : null}
                    </div>
                </div>
            </div>
        )
    }
}