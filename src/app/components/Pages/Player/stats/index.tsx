import * as Inferno from "inferno";
import RankOverview from "./modules/RankOverview";
import SeasonOverview from "./modules/SeasonOverview";
import Aliases from "./modules/Aliases";
import GameModes from "./modules/GameModes";
import StatOverview from "./modules/StatOverview";
import Charts from "./modules/Charts";

import "./statstab.scss";

export default function StatsTab(props) {
    return (
        <div className="statstab">
            <div className="statstab__sidebar">
                <RankOverview {...props} />
                {props.aliases && props.aliases.length > 1 ? <Aliases {...props} /> : null}
            </div>
            <div className="statstab__statarea">
                <div className="statstab__center">
                    {props.stats ? <StatOverview {...props} /> : null}
                    <SeasonOverview {...props} />
                    {props.stats ? <Charts {...props} /> : null}
                </div>
                <div className="statstab__aside">{props.stats ? <GameModes {...props} /> : null}</div>
            </div>
        </div>
    );
}
