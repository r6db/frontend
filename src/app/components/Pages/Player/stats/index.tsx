import * as React from "react";
import RankOverview from "./modules/RankOverview";
import SeasonOverview from "./modules/SeasonOverview";
import Aliases from "./modules/Aliases";
import RankedStats from "./modules/RankedStats";
import GameModes from "./modules/GameModes";
import StatOverview from "./modules/StatOverview";
import Charts from "./modules/Charts";
import Ad from "components/misc/Ad";

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
                    {props.stats ? <StatOverview {...props} /> : null}
                    <RankedStats {...props} />
                    <div className="playermodule__divider"></div>
                    {props.stats ? <Charts {...props} /> : null}
                </div>
                <div className="statstab__aside">
                    {props.stats ? <GameModes {...props} /> : null}
                    <div className="playermodule__divider"></div>
                    <Ad />
                </div>
            </div>
        </div>
    );
}
