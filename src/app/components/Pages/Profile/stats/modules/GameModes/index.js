import * as m from "mithril";
import "./gamemodes.scss";
import Stat from "components/misc/Stat"
import { getWinChance } from "lib/stats";

const ModeStats = {
    view({ attrs }) {
        return (
            <div className="profile-module-content mode">
                <Stat label="max score">{attrs.bestScore}</Stat>
                <Stat label="wins">{attrs.won}</Stat>
                <Stat label="losses">{attrs.lost}</Stat>
                <Stat label="win rate">{getWinChance(attrs)}</Stat>
            </div>
        )
    }
}


export default {
    view({ attrs }) {
        return (
            <div className="profile-module gamemodes">
                <div className="profile-module-header">Bomb</div>
                <div className="profile-module-content mode">
                    <Stat label="max score">{attrs.stats.bomb.bestScore}</Stat>
                    <Stat label="wins">{attrs.stats.bomb.won}</Stat>
                    <Stat label="losses">{attrs.stats.bomb.lost}</Stat>
                    <Stat label="win rate">{getWinChance(attrs.stats.bomb)}</Stat>
                </div>

                <div className="profile-module-header">Secure Area</div>
                <div className="profile-module-content mode">
                    <Stat label="max score">{attrs.stats.secure.bestScore}</Stat>
                    <Stat label="wins">{attrs.stats.secure.won}</Stat>
                    <Stat label="losses">{attrs.stats.secure.lost}</Stat>
                    <Stat label="win rate">{getWinChance(attrs.stats.secure)}</Stat>
                    <Stat label="first to secure">{attrs.stats.general.serverAggression}</Stat>
                    <Stat label="secured">{attrs.stats.general.serversHacked}</Stat>
                    <Stat label="secure denied">{attrs.stats.general.serverDefender}</Stat>
                </div>

                <div className="profile-module-header">Hostage</div>
                <div className="profile-module-content mode">
                    <Stat label="max score">{attrs.stats.hostage.bestScore}</Stat>
                    <Stat label="wins">{attrs.stats.hostage.won}</Stat>
                    <Stat label="losses">{attrs.stats.hostage.lost}</Stat>
                    <Stat label="win rate">{getWinChance(attrs.stats.hostage)}</Stat>
                    <Stat label="extractions">{attrs.stats.general.hostageRescue}</Stat>
                    <Stat label="extractions denied">{attrs.stats.general.hostageDefense}</Stat>
                </div>
            </div>
        )
    }
}