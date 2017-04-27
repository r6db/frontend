import m from "mithril";

import Profilepic from "components/misc/Profilepic";
import Alias from "./Alias";
import Rank from "./Rank";
import Playtime from "./modules/Playtime";
import Timedata from "./modules/Timedata";
import Casual from "./modules/Casual";
import General from "./modules/General";
import RankedStats from "./modules/RankedStats";
import { getRegionName } from "lib/region";
import Log from "lib/log";
const log = Log.child(__filename);
const isConsole = require("lib/constants").isConsole;

export default {
    view({ attrs, state }) {
        return (
            <div className={`detail-player player-${attrs.id} is-${attrs.role || "user"}`}>
                <div className="detail-header">
                    <div className="detail-headerimage">
                        <span className="detail-level">lvl {attrs.level}</span>
                        <Profilepic id={attrs.id} delay={0} />
                    </div>
                    <div className="detail-headertext">
                        <div className="detail-header-left">
                            <div className="detail-name">{attrs.name}</div>
                            { isConsole ? null : <a href={`https://game-rainbow6.ubi.com/en-gb/uplay/player-statistics/${attrs.id}/multiplayer`}
                                className="detail-id"
                                title="show on uplay">
                                {attrs.id}
                            </a> }
                        </div>
                        <div className="detail-header-right">
                            <div className="season-ranks">
                                {attrs.pastRanks.map(x => <Rank rank={x} />)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail-content">
                    <div className="detail-info">
                        <div className="detail-aliases">
                            {attrs.aliases.map(x => <Alias alias={x} />)}
                        </div>
                    </div>
                    <div className="detail-stats">
                        <Timedata player={attrs} />
                        <Playtime player={attrs} />
                        <General player={attrs} />
                        <Casual player={attrs} />
                        {attrs.rank && attrs.rank.ncsa ? <RankedStats region={getRegionName("ncsa")}stats={attrs.rank.ncsa}/> : null}
                        {attrs.rank && attrs.rank.emea ? <RankedStats region={getRegionName("emea")} stats={attrs.rank.emea} /> : null}
                        {attrs.rank && attrs.rank.apac ? <RankedStats region={getRegionName("apac")} stats={attrs.rank.apac} /> : null}
                    </div>
                </div>
            </div>
        );
    }
};
