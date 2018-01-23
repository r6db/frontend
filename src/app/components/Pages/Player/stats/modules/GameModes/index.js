import * as Inferno from "inferno";
import * as get from "lodash/get";
import "./gamemodes.scss";
import Stat from "components/misc/Stat";
import { getWinChance } from "lib/stats";

const ModeStats = {
    view({ attrs }) {
        return (
            <div className="playermodule__content mode">
                <Stat label="max score">{get(attrs, "bestScore", 0)}</Stat>
                <Stat label="wins">{get(attrs, "won", 0)}</Stat>
                <Stat label="losses">{get(attrs, "lost", 0)}</Stat>
                <Stat label="win rate">{getWinChance(attrs)}</Stat>
            </div>
        );
    },
};

export default {
    view({ attrs }) {
        return (
            <div className="playermodule gamemodes">
                <div className="playermodule__header">Bomb</div>
                <div className="playermodule__content mode">
                    <Stat label="max score">{get(attrs, "stats.bomb.bestScore", 0)}</Stat>
                    <Stat label="wins">{get(attrs, "stats.bomb.won", 0)}</Stat>
                    <Stat label="losses">{get(attrs, "stats.bomb.lost", 0)}</Stat>
                    <Stat label="win rate">{getWinChance(attrs.stats.bomb)}</Stat>
                </div>

                <div className="playermodule__header">Secure Area</div>
                <div className="playermodule__content mode">
                    <Stat label="max score">{get(attrs, "stats.secure.bestScore", 0)}</Stat>
                    <Stat label="wins">{get(attrs, "stats.secure.won", 0)}</Stat>
                    <Stat label="losses">{get(attrs, "stats.secure.lost", 0)}</Stat>
                    <Stat label="win rate">{getWinChance(attrs.stats.secure)}</Stat>
                    <Stat label="first to secure">{get(attrs, "stats.general.serverAggression", 0)}</Stat>
                    <Stat label="secured">{get(attrs, "stats.general.serversHacked", 0)}</Stat>
                    <Stat label="secure denied">{get(attrs, "stats.general.serverDefender", 0)}</Stat>
                </div>

                <div className="playermodule__header">Hostage</div>
                <div className="playermodule__content mode">
                    <Stat label="max score">{get(attrs, "stats.hostage.bestScore", 0)}</Stat>
                    <Stat label="wins">{get(attrs, "stats.hostage.won", 0)}</Stat>
                    <Stat label="losses">{get(attrs, "stats.hostage.lost", 0)}</Stat>
                    <Stat label="win rate">{getWinChance(attrs.stats.hostage)}</Stat>
                    <Stat label="extractions">{get(attrs, "stats.general.hostageRescue", 0)}</Stat>
                    <Stat label="extractions denied">{get(attrs, "stats.general.hostageDefense", 0)}</Stat>
                </div>
            </div>
        );
    },
};
