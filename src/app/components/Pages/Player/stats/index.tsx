import * as React from "react";
import { FormattedMessage } from "react-intl";
import RankOverview from "./modules/RankOverview";
import SeasonOverview from "./modules/SeasonOverview";
import Aliases from "./modules/Aliases";
import StatsGeneral from "./modules/StatsGeneral";
import StatsRankings from "./modules/StatsRankings";
import StatsGameModes from "./modules/StatsGameModes";
import StatsCharts from "./modules/StatsCharts";
import TimeSwitch from "./modules/TimeSwitch";

import "./statstab.scss";
import Button from "components/misc/Button";

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
                {props.rank ? (
                    <>
                        <RankOverview {...props} />
                        <div className="playermodule__divider" />
                        <SeasonOverview {...props} />
                        <div className="playermodule__divider" />
                    </>
                ) : null}
                {props.aliases && props.aliases.length > 1 ? <Aliases {...props} /> : null}
            </div>
            <div className="statstab__content">
                <div className="statstab__center">
                    {props.stats ? <TimeSwitch {...props} /> : null}
                    {props.stats ? <StatsGeneral {...props} stats={stats} /> : null}
                    <StatsRankings {...props} rank={rank} />
                    <div className="playermodule__divider" />
                    {props.season === -1 && props.stats ? <StatsCharts {...props} /> : null}
                </div>
                <div className="statstab__aside">
                    {props.stats ? <StatsGameModes {...props} stats={stats} /> : null}
                </div>
            </div>
        </div>
    );
}
