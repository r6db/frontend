import * as React from "react";
import { FormattedMessage } from "react-intl";
import Button from "components/misc/Button";
import RankOverview from "./modules/RankOverview";
import SeasonOverview from "./modules/SeasonOverview";
import Aliases from "./modules/Aliases";
import StatsGeneral from "./modules/StatsGeneral";
import StatsCasual from "./modules/StatsCasual";
import StatsRanked from "./modules/StatsRanked";
import StatsRankings from "./modules/StatsRankings";
import StatsGameModes from "./modules/StatsGameModes";
import StatsCharts from "./modules/StatsCharts";

import "./statstab.scss";

export default function StatsTab(props) {
    if (props.snapshots.find(x => x.season === props.season) === undefined) {
        return (
            <div className="statstab statstab--norecord">
                <span>
                    <FormattedMessage id="player/norecord" />
                </span>
                <Button label="show total stats" role="primary" onClick={() => props.changeTime(-1)} />
            </div>
        );
    }
    const stats = props.snapshots.find(x => x.season === props.season).stats;
    const rank = props.season === -1 ? props.rank : props.seasonRanks.find(x => x.season === props.season);
    return (
        <div className="statstab">
            <div className="statstab__sidebar">
                <RankOverview {...props} />
                <SeasonOverview {...props} />
                <Aliases {...props} />
            </div>
            <div className="statstab__content">
                {props.stats ? <StatsGeneral {...props} stats={stats} /> : null}
                <div className="statstab__row">
                    <div className="statstab__col">{props.stats ? <StatsCasual {...props} stats={stats} /> : null}</div>
                    <div className="statstab__col">{props.stats ? <StatsRanked {...props} stats={stats} /> : null}</div>
                </div>
                <div className="statstab__row">
                    <div className="statstab__col ranking">
                        <StatsRankings {...props} rank={rank} />
                        {props.stats ? <StatsCharts {...props} /> : null}
                    </div>
                    <div className="statstab__col gamemode">
                        {props.stats ? <StatsGameModes {...props} stats={stats} /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
