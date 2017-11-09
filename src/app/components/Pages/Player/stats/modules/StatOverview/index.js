import * as m from "mithril";
import Stat from "components/misc/Stat";
import * as get from "lodash/get";
import { formatDuration, getWinChance, getKillRatio } from "lib/stats";
import "./statoverview.scss";

export default {
    view({ attrs }) {
        return (
            <div className="player-module statoverview">
                <div className="player-module-header">General</div>
                <div className="row">
                    <div className="col">
                        <Stat label="wins">{get(attrs, "stats.general.won", 0)}</Stat>
                        <Stat label="losses">{get(attrs, "stats.general.lost", 0)}</Stat>
                        <Stat label="win rate" tooltip="how many % of your games are wins">{getWinChance(attrs.stats.general)}</Stat>
                        <Stat label="dbno">{get(attrs, "stats.general.dbno", 0)}</Stat>
                        <Stat label="dbno assists">{get(attrs, "stats.general.dbnoAssists", 0)}</Stat>
                    </div>
                    <div className="col">
                        <Stat label="kills">{get(attrs, "stats.general.kills", 0)}</Stat>
                        <Stat label="k/d ratio">{getKillRatio(attrs.stats.general)}</Stat>
                        <Stat label="deaths">{get(attrs, "stats.general.deaths", 0)}</Stat>
                        <Stat label="assists">{get(attrs, "stats.general.assists", 0)}</Stat>
                        <Stat label="suicides">{get(attrs, "stats.general.suicides", 0)}</Stat>
                    </div>
                    <div className="col">
                        <Stat label="accuracy">{get(attrs, "stats.general.hitChance", 0).toFixed(2)}%</Stat>
                        <Stat label="headshots">{get(attrs, "stats.general.headshot", 0)}</Stat>
                        <Stat label="hs ratio" tooltip="how many of your kills are headshots">
                            {get(attrs, "stats.general.headshotRatio", 0).toFixed(2)}%
                        </Stat>
                        <Stat label="hs / hits" tooltip="the chance of a shot being a headshot">
                            {get(attrs, "stats.general.headshotChance", 0).toFixed(2)}%
                        </Stat>
                    </div>
                </div>

                <div className="player-module-header">Ranked</div>
                <div className="row">
                    <div className="col">
                        <Stat label="wins">{get(attrs, "stats.ranked.won", 0)}</Stat>
                        <Stat label="losses">{get(attrs, "stats.ranked.lost", 0)}</Stat>
                        <Stat label="win rate">{getWinChance(attrs.stats.ranked)}</Stat>
                    </div>
                    <div className="col">
                        <Stat label="kills">{get(attrs, "stats.ranked.kills", 0)}</Stat>
                        <Stat label="deaths">{get(attrs, "stats.ranked.deaths", 0)}</Stat>
                        <Stat label="k/d ratio">{getKillRatio(attrs.stats.ranked)}</Stat>
                    </div>
                    <div className="col">
                        <Stat label="abandons">{get(attrs, "stats.ranked.abandons", 0)}</Stat>
                        <Stat label="playtime">{formatDuration(get(attrs, "lastPlayed.ranked", 0))}</Stat>
                    </div>
                </div>

                <div className="player-module-header">Casual</div>
                <div className="row">
                    <div className="col">
                        <Stat label="wins">{get(attrs, "stats.casual.won", 0)}</Stat>
                        <Stat label="losses">{get(attrs, "stats.casual.lost", 0)}</Stat>
                        <Stat label="win rate">{getWinChance(attrs.stats.casual)}</Stat>
                    </div>
                    <div className="col">
                        <Stat label="kills">{get(attrs, "stats.casual.kills", 0)}</Stat>
                        <Stat label="deaths">{get(attrs, "stats.casual.deaths", 0)}</Stat>
                        <Stat label="k/d ratio">{getKillRatio(attrs.stats.casual)}</Stat>
                    </div>
                    <div className="col">
                        <Stat label="playtime">{formatDuration(get(attrs, "lastPlayed.casual", 0))}</Stat>
                    </div>
                </div>

                <div className="player-module-header">Misc</div>
                <div className="row">
                    <div className="col">
                        <Stat label="melees">{get(attrs, "stats.general.meleeKills", 0)}</Stat>
                        <Stat label="revives">{get(attrs, "stats.general.revives", 0)}</Stat>
                        <Stat label="gadgets destroyed">
                            {get(attrs, "stats.general.gadgetsDestroyed", 0)}
                        </Stat>
                    </div>
                    <div className="col">
                        <Stat label="pen. kills" tooltip="how many kills were by wallbang">
                            {get(attrs, "stats.general.penetrationKills", 0)}
                        </Stat>
                        <Stat label="revives denied">{get(attrs, "stats.general.revivesDenied", 0)}</Stat>
                    </div>
                    <div className="col">
                        <Stat label="blindfires">{get(attrs, "stats.general.blindKills", 0)}</Stat>
                        <Stat label="rappel breaches">{get(attrs, "stats.general.rappelBreaches", 0)}</Stat>
                    </div>
                </div>

                <div className="player-module-divider"></div>
                <div className="row">
                    <div className="col">
                        <Stat label="first added">
                            {new Date(attrs.created_at).toLocaleDateString()}
                        </Stat>
                    </div>
                    <div className="col">
                        <Stat label="last played">
                            {attrs.lastPlayed.last_played
                                ? new Date(get(attrs, "lastPlayed.last_played", new Date())).toLocaleDateString()
                                : "-"
                            }
                        </Stat>
                    </div>
                </div>
            </div>
        )
    }
}
