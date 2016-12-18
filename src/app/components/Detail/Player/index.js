import m from "mithril";

import Profilepic from "../../misc/Profilepic";
import Alias from "./Alias";
import Playtime from "./modules/Playtime";
import Timedata from "./modules/Timedata";
import GeneralStats from "./modules/GeneralStats";
import RankedStats from "./modules/RankedStats";


import Log from "lib/log";
const log = Log.child(__filename);


export default {
    view({ attrs, state }) {
        return (
            <div className={`detail-player player-${attrs.id} is-${attrs.role || "user"}`}>
                <div className="detail-header">
                    <div className="detail-headerimage">
                        <Profilepic id={attrs.id} delay={0} />
                    </div>
                    <div className="detail-headertext">
                        <div className="detail-name">{attrs.aliases[0].name}</div>
                        <a href={`https://game-rainbow6.ubi.com/en-gb/uplay/player-statistics/${attrs.id}/multiplayer`}
                            className="detail-id"
                            title="show on uplay">
                            {attrs.id}
                        </a>
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
                        <GeneralStats player={attrs} />
                        {attrs.rank && attrs.rank.ncsa ? <RankedStats region="America" stats={attrs.rank.ncsa}/> : null}
                        {attrs.rank && attrs.rank.emea ? <RankedStats region="Europe" stats={attrs.rank.emea} /> : null}
                        {attrs.rank && attrs.rank.apac ? <RankedStats region="Asia" stats={attrs.rank.apac} /> : null}
                    </div>
                </div>
            </div>
        );
    }
};
