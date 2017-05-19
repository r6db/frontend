import * as m from "mithril";

import Profilepic from "components/misc/Profilepic";
import Alias from "./Alias";
import Rank from "./Rank";
import Timedata from "./modules/Timedata";
import Casual from "./modules/Casual";
import General from "./modules/General";
import Ranked from "./modules/Ranked";
import RankedSeason from "./modules/RankedSeason";
import { getRegionName } from "lib/region";
import { isConsole } from "lib/constants";

export default {
    view({ attrs, state }) {
        return (
            <div className={`detail-player player-${attrs.id} is-${attrs.role || "user"}`}>
                <div className="detail-header">
                    <div className="detail-info">
                        <div className="detail-identification">
                            <div className="detail-headerimage">
                                <span className="detail-level">lvl {attrs.level}</span>
                                <Profilepic id={attrs.id} delay={0} />
                            </div>
                            <div className="detail-headertext">
                                <div className="detail-name">{attrs.name}</div>
                                { isConsole ? null : <a href={`https://game-rainbow6.ubi.com/en-gb/uplay/player-statistics/${attrs.id}/multiplayer`}
                                    className="detail-id"
                                    title="show on uplay">
                                    {attrs.id}
                                </a> }
                                {attrs.globalRank === 0
                                    ? null
                                    : <div className="detail-global-rank">
                                        Global <span>#{attrs.globalRank}</span>
                                    </div>}
                            </div>
                        </div>
                        <div className="detail-seasonranks">
                            {attrs.pastRanks.map(x => <Rank rank={x} />)}
                        </div>
                    </div>
                    <div className="detail-aliases">
                        {attrs.aliases.map(x => <Alias alias={x} />)}
                    </div>
                </div>
                <div className="detail-content">
                    <div className="detail-stats">
                        <Timedata player={attrs} />
                        <General player={attrs} />
                        <Casual player={attrs} />
                        <Ranked player={attrs} />
                        {attrs.rank && attrs.rank.ncsa ? <RankedSeason region={getRegionName("ncsa")}stats={attrs.rank.ncsa}/> : null}
                        {attrs.rank && attrs.rank.emea ? <RankedSeason region={getRegionName("emea")} stats={attrs.rank.emea} /> : null}
                        {attrs.rank && attrs.rank.apac ? <RankedSeason region={getRegionName("apac")} stats={attrs.rank.apac} /> : null}
                    </div>
                </div>
            </div>
        );
    }
};
