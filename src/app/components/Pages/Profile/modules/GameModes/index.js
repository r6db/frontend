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
                <ModeStats mode="Bomb" {...attrs.stats.bomb} />
                <div className="profile-module-header">Secure Area</div>
                <ModeStats mode="Secure area" {...attrs.stats.secure} />
                <div className="profile-module-header">Hostage</div>
                <ModeStats mode="Hostage" {...attrs.stats.hostage} />
            </div>
        )
    }
}