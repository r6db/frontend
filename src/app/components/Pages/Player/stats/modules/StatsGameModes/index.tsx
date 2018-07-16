import * as React from "react";
import { FormattedMessage } from "react-intl";
import * as get from "lodash/get";
import "./gamemodes.scss";
import Stat from "components/misc/Stat";
import { getWinChance } from "lib/stats";

export default function StatsGameModes(props) {
    return (
        <div className="playermodule gamemodes">
            <div className="playermodule__header">
                <FormattedMessage id="mode/bomb" />
            </div>
            <div className="playermodule__content mode">
                <Stat label={<FormattedMessage id="player/maxScore" />}>{get(props, "stats.bomb.bestScore", 0)}</Stat>
                <Stat label={<FormattedMessage id="wins" />}>{get(props, "stats.bomb.won", 0)}</Stat>
                <Stat label={<FormattedMessage id="losses" />}>{get(props, "stats.bomb.lost", 0)}</Stat>
                <Stat label={<FormattedMessage id="winRate" />}>{getWinChance(props.stats.bomb)}</Stat>
            </div>

            <div className="playermodule__header">
                <FormattedMessage id="mode/secure" />
            </div>
            <div className="playermodule__content mode">
                <Stat label={<FormattedMessage id="player/maxScore" />}>{get(props, "stats.secure.bestScore", 0)}</Stat>
                <Stat label={<FormattedMessage id="wins" />}>{get(props, "stats.secure.won", 0)}</Stat>
                <Stat label={<FormattedMessage id="losses" />}>{get(props, "stats.secure.lost", 0)}</Stat>
                <Stat label={<FormattedMessage id="winRate" />}>{getWinChance(props.stats.secure)}</Stat>
                <Stat label={<FormattedMessage id="mode/secure/first" />}>
                    {get(props, "stats.general.serverAggression", 0)}
                </Stat>
                <Stat label={<FormattedMessage id="mode/secure/secured" />}>
                    {get(props, "stats.general.serversHacked", 0)}
                </Stat>
                <Stat label={<FormattedMessage id="mode/secure/denied" />}>
                    {get(props, "stats.general.serverDefender", 0)}
                </Stat>
            </div>

            <div className="playermodule__header">
                <FormattedMessage id="mode/hostage" />
            </div>
            <div className="playermodule__content mode">
                <Stat label={<FormattedMessage id="player/maxScore" />}>
                    {get(props, "stats.hostage.bestScore", 0)}
                </Stat>
                <Stat label={<FormattedMessage id="wins" />}>{get(props, "stats.hostage.won", 0)}</Stat>
                <Stat label={<FormattedMessage id="losses" />}>{get(props, "stats.hostage.lost", 0)}</Stat>
                <Stat label={<FormattedMessage id="winRate" />}>{getWinChance(props.stats.hostage)}</Stat>
                <Stat label={<FormattedMessage id="mode/hostage/extracted" />}>
                    {get(props, "stats.general.hostageRescue", 0)}
                </Stat>
                <Stat label={<FormattedMessage id="mode/hostage/denied" />}>
                    {get(props, "stats.general.hostageDefense", 0)}
                </Stat>
            </div>
        </div>
    );
}
