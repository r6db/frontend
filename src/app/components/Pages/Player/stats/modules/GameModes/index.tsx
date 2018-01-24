import * as React from "react";
import * as get from "lodash/get";
import "./gamemodes.scss";
import Stat from "components/misc/Stat";
import { getWinChance } from "lib/stats";

export default function PlayerGamemodes(props) {
    return (
        <div className="playermodule gamemodes">
            <div className="playermodule__header">Bomb</div>
            <div className="playermodule__content mode">
                <Stat label="max score">{get(props, "stats.bomb.bestScore", 0)}</Stat>
                <Stat label="wins">{get(props, "stats.bomb.won", 0)}</Stat>
                <Stat label="losses">{get(props, "stats.bomb.lost", 0)}</Stat>
                <Stat label="win rate">{getWinChance(props.stats.bomb)}</Stat>
            </div>

            <div className="playermodule__header">Secure Area</div>
            <div className="playermodule__content mode">
                <Stat label="max score">{get(props, "stats.secure.bestScore", 0)}</Stat>
                <Stat label="wins">{get(props, "stats.secure.won", 0)}</Stat>
                <Stat label="losses">{get(props, "stats.secure.lost", 0)}</Stat>
                <Stat label="win rate">{getWinChance(props.stats.secure)}</Stat>
                <Stat label="first to secure">{get(props, "stats.general.serverAggression", 0)}</Stat>
                <Stat label="secured">{get(props, "stats.general.serversHacked", 0)}</Stat>
                <Stat label="secure denied">{get(props, "stats.general.serverDefender", 0)}</Stat>
            </div>

            <div className="playermodule__header">Hostage</div>
            <div className="playermodule__content mode">
                <Stat label="max score">{get(props, "stats.hostage.bestScore", 0)}</Stat>
                <Stat label="wins">{get(props, "stats.hostage.won", 0)}</Stat>
                <Stat label="losses">{get(props, "stats.hostage.lost", 0)}</Stat>
                <Stat label="win rate">{getWinChance(props.stats.hostage)}</Stat>
                <Stat label="extractions">{get(props, "stats.general.hostageRescue", 0)}</Stat>
                <Stat label="extractions denied">{get(props, "stats.general.hostageDefense", 0)}</Stat>
            </div>
        </div>
    );
}
