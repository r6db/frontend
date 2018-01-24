import * as React from "react";
import Stat from "components/misc/Stat";
import * as get from "lodash/get";
import { formatDuration, getWinChance, getKillRatio } from "lib/stats";
import "./statoverview.scss";

export default function StatOverview(props) {
    return (
        <div className="playermodule statoverview">
            <div className="playermodule__header">General</div>
            <div className="row">
                <div className="col">
                    <Stat label="wins">{get(props, "stats.general.won", 0)}</Stat>
                    <Stat label="losses">{get(props, "stats.general.lost", 0)}</Stat>
                    <Stat label="win rate" tooltip="how many % of your games are wins">
                        {getWinChance(props.stats.general)}
                    </Stat>
                    <Stat label="dbno">{get(props, "stats.general.dbno", 0)}</Stat>
                </div>
                <div className="col">
                    <Stat label="kills">{get(props, "stats.general.kills", 0)}</Stat>
                    <Stat label="k/d ratio">{getKillRatio(props.stats.general)}</Stat>
                    <Stat label="deaths">{get(props, "stats.general.deaths", 0)}</Stat>
                    <Stat label="assists">{get(props, "stats.general.assists", 0)}</Stat>
                </div>
                <div className="col">
                    <Stat label="accuracy">{get(props, "stats.general.hitChance", 0).toFixed(2)}%</Stat>
                    <Stat label="headshots">{get(props, "stats.general.headshot", 0)}</Stat>
                    <Stat label="hs ratio" tooltip="how many of your kills are headshots">
                        {get(props, "stats.general.headshotRatio", 0).toFixed(2)}%
                    </Stat>
                    <Stat label="hs / hits" tooltip="the chance of a shot being a headshot">
                        {get(props, "stats.general.headshotChance", 0).toFixed(2)}%
                    </Stat>
                </div>
            </div>

            <div className="playermodule__header">Ranked</div>
            <div className="row">
                <div className="col">
                    <Stat label="wins">{get(props, "stats.ranked.won", 0)}</Stat>
                    <Stat label="losses">{get(props, "stats.ranked.lost", 0)}</Stat>
                    <Stat label="win rate">{getWinChance(props.stats.ranked)}</Stat>
                </div>
                <div className="col">
                    <Stat label="kills">{get(props, "stats.ranked.kills", 0)}</Stat>
                    <Stat label="deaths">{get(props, "stats.ranked.deaths", 0)}</Stat>
                    <Stat label="k/d ratio">{getKillRatio(props.stats.ranked)}</Stat>
                </div>
                <div className="col">
                    <Stat label="abandons">{get(props, "stats.ranked.abandons", 0)}</Stat>
                    <Stat label="playtime">{formatDuration(get(props, "lastPlayed.ranked", 0))}</Stat>
                </div>
            </div>

            <div className="playermodule__header">Casual</div>
            <div className="row">
                <div className="col">
                    <Stat label="wins">{get(props, "stats.casual.won", 0)}</Stat>
                    <Stat label="losses">{get(props, "stats.casual.lost", 0)}</Stat>
                    <Stat label="win rate">{getWinChance(props.stats.casual)}</Stat>
                </div>
                <div className="col">
                    <Stat label="kills">{get(props, "stats.casual.kills", 0)}</Stat>
                    <Stat label="deaths">{get(props, "stats.casual.deaths", 0)}</Stat>
                    <Stat label="k/d ratio">{getKillRatio(props.stats.casual)}</Stat>
                </div>
                <div className="col">
                    <Stat label="playtime">{formatDuration(get(props, "lastPlayed.casual", 0))}</Stat>
                </div>
            </div>

            <div className="playermodule__header">Misc</div>
            <div className="row">
                <div className="col">
                    <Stat label="melees">{get(props, "stats.general.meleeKills", 0)}</Stat>
                    <Stat label="revives">{get(props, "stats.general.revives", 0)}</Stat>
                    <Stat label="gadgets destroyed">{get(props, "stats.general.gadgetsDestroyed", 0)}</Stat>
                </div>
                <div className="col">
                    <Stat label="pen. kills" tooltip="how many kills were by wallbang">
                        {get(props, "stats.general.penetrationKills", 0)}
                    </Stat>
                    <Stat label="revives denied">{get(props, "stats.general.revivesDenied", 0)}</Stat>
                    <Stat label="suicides">{get(props, "stats.general.suicides", 0)}</Stat>
                </div>
                <div className="col">
                    <Stat label="blindfires">{get(props, "stats.general.blindKills", 0)}</Stat>
                    <Stat label="rappel breaches">{get(props, "stats.general.rappelBreaches", 0)}</Stat>
                </div>
            </div>

            <div className="playermodule__divider" />
            <div className="row">
                <div className="col">
                    <Stat label="first added">{new Date(props.created_at).toLocaleDateString()}</Stat>
                </div>
                <div className="col">
                    <Stat label="last played">
                        {props.lastPlayed.last_played
                            ? new Date(get(props, "lastPlayed.last_played", new Date())).toLocaleDateString()
                            : "-"}
                    </Stat>
                </div>
            </div>
        </div>
    );
}
