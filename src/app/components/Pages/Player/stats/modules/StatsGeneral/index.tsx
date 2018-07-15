import * as React from "react";
import { FormattedMessage } from "react-intl";
import Stat from "components/misc/Stat";
import * as get from "lodash/get";
import { formatDuration, getWinChance, getKillRatio } from "lib/stats";
import "./general.scss";

export default function StatsGeneral(props) {
    return (
        <div className="playermodule statoverview">
            <div className="playermodule__header">General</div>
            <div className="row">
                <div className="col">
                    <Stat label={<FormattedMessage id="wins" />}>{get(props, "stats.general.won", 0)}</Stat>
                    <Stat label={<FormattedMessage id="losses" />}>{get(props, "stats.general.lost", 0)}</Stat>
                    <Stat label={<FormattedMessage id="winRate" />}>{getWinChance(props.stats.general)}</Stat>
                    <Stat label={<FormattedMessage id="dbnos" />}>{get(props, "stats.general.dbno", 0)}</Stat>
                </div>
                <div className="col">
                    <Stat label={<FormattedMessage id="kills" />}>{get(props, "stats.general.kills", 0)}</Stat>
                    <Stat label={<FormattedMessage id="kdRatio" />}>{getKillRatio(props.stats.general)}</Stat>
                    <Stat label={<FormattedMessage id="deaths" />}>{get(props, "stats.general.deaths", 0)}</Stat>
                    <Stat label={<FormattedMessage id="assists" />}>{get(props, "stats.general.assists", 0)}</Stat>
                </div>
                <div className="col">
                    {/* <Stat label="accuracy">{get(props, "stats.general.hitChance", 0).toFixed(2)}%</Stat> */}
                    <Stat label={<FormattedMessage id="headshots" />}> {get(props, "stats.general.headshot", 0)}</Stat>
                    <Stat label={<FormattedMessage id="headshotRatio" />}>
                        {get(props, "stats.general.headshotRatio", 0).toFixed(2)}%
                    </Stat>
                    <Stat label={<FormattedMessage id="headshotHits" />}>
                        {get(props, "stats.general.headshotChance", 0).toFixed(2)}%
                    </Stat>
                </div>
            </div>

            <div className="playermodule__header">
                <FormattedMessage id="player/ranked" />
            </div>
            <div className="row">
                <div className="col">
                    <Stat label={<FormattedMessage id="wins" />}>{get(props, "stats.ranked.won", 0)}</Stat>
                    <Stat label={<FormattedMessage id="losses" />}>{get(props, "stats.ranked.lost", 0)}</Stat>
                    <Stat label={<FormattedMessage id="winRate" />}>{getWinChance(props.stats.ranked)}</Stat>
                </div>
                <div className="col">
                    <Stat label={<FormattedMessage id="kills" />}>{get(props, "stats.ranked.kills", 0)}</Stat>
                    <Stat label={<FormattedMessage id="deaths" />}>{get(props, "stats.ranked.deaths", 0)}</Stat>
                    <Stat label={<FormattedMessage id="kdRatio" />}>{getKillRatio(props.stats.ranked)}</Stat>
                </div>
                <div className="col">
                    <Stat label={<FormattedMessage id="abandons" />}>{get(props, "stats.ranked.abandons", 0)}</Stat>
                    <Stat label={<FormattedMessage id="timePlayed" />}>
                        {formatDuration(get(props, "stats.ranked.timePlayed", 0))}
                    </Stat>
                </div>
            </div>

            <div className="playermodule__header">Casual</div>
            <div className="row">
                <div className="col">
                    <Stat label={<FormattedMessage id="wins" />}>{get(props, "stats.casual.won", 0)}</Stat>
                    <Stat label={<FormattedMessage id="losses" />}>{get(props, "stats.casual.lost", 0)}</Stat>
                    <Stat label={<FormattedMessage id="winRate" />}>{getWinChance(props.stats.casual)}</Stat>
                </div>
                <div className="col">
                    <Stat label={<FormattedMessage id="kills" />}>{get(props, "stats.casual.kills", 0)}</Stat>
                    <Stat label={<FormattedMessage id="deaths" />}>{get(props, "stats.casual.deaths", 0)}</Stat>
                    <Stat label={<FormattedMessage id="kdRatio" />}>{getKillRatio(props.stats.casual)}</Stat>
                </div>
                <div className="col">
                    <Stat label={<FormattedMessage id="timePlayed" />}>
                        {formatDuration(get(props, "stats.casual.timePlayed", 0))}
                    </Stat>
                </div>
            </div>

            <div className="playermodule__header">Misc</div>
            <div className="row">
                <div className="col">
                    <Stat label={<FormattedMessage id="melee" />}>{get(props, "stats.general.meleeKills", 0)}</Stat>
                    <Stat label={<FormattedMessage id="revives" />}>{get(props, "stats.general.revives", 0)}</Stat>
                    <Stat label={<FormattedMessage id="gadgetsDestroyed" />}>
                        {get(props, "stats.general.gadgetsDestroyed", 0)}
                    </Stat>
                </div>
                <div className="col">
                    <Stat label={<FormattedMessage id="penKills" />}>
                        {get(props, "stats.general.penetrationKills", 0)}
                    </Stat>
                    <Stat label={<FormattedMessage id="revivesDenied" />}>
                        {get(props, "stats.general.revivesDenied", 0)}
                    </Stat>
                    <Stat label={<FormattedMessage id="suicides" />}>{get(props, "stats.general.suicides", 0)}</Stat>
                </div>
                <div className="col">
                    <Stat label={<FormattedMessage id="blindKills" />}>
                        {get(props, "stats.general.blindKills", 0)}
                    </Stat>
                    <Stat label={<FormattedMessage id="rappelBreaches" />}>
                        {get(props, "stats.general.rappelBreaches", 0)}
                    </Stat>
                </div>
            </div>
        </div>
    );
}
