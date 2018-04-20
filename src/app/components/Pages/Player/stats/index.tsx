import * as React from "react";
import RankOverview from "./modules/RankOverview";
import SeasonOverview from "./modules/SeasonOverview";
import Aliases from "./modules/Aliases";
import StatsGeneral from "./modules/StatsGeneral";
import StatsRankings from "./modules/StatsRankings";
import StatsGameModes from "./modules/StatsGameModes";
import StatsCharts from "./modules/StatsCharts";

import "./statstab.scss";

export default function StatsTab(props) {
    return (
        <div className="statstab">
            <div className="statstab__sidebar">
                <RankOverview {...props} />
                <div className="playermodule__divider"></div>
                <SeasonOverview {...props} />
                <div className="playermodule__divider"></div>
                {props.aliases && props.aliases.length > 1
                    ? <Aliases {...props} />
                    : null }
            </div>
            <div className="statstab__content">
                <div className="statstab__center">
                    {props.stats ? <StatsGeneral {...props} /> : null}
                    <StatsRankings {...props} />
                    <div className="playermodule__divider"></div>
                    {props.stats ? <StatsCharts {...props} /> : null}
                </div>
                <div className="statstab__aside">
                    {props.stats ? <StatsGameModes {...props} /> : null}
                </div>
            </div>
        </div>
    );
}
