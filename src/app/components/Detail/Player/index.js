import m from "mithril";
import moment from "moment";
import { DATE_SHORT } from "lib/constants";
import Log from "lib/log";

import Profilepic from "../../misc/Profilepic";
import Tabs from "./Tabs";
import Overview from "./Content/Overview";

const tabMap = {
    tab1: { label: "Overview", icon: null },
    tab2: { label: "Rank", icon: null },
    tab3: { label: "Stats", icon: null },
    tab4: { label: "Operators", icon: null },
    tab5: { label: "Weapons", icon: null },
};

export default {
    view({ attrs, state }) {
        return (
            <div className={`detail-player player-${attrs.id} is-${attrs.role || "user"}`}>
                <div className="detail-header">
                    <div className="detail-caption">
                        <div className="detail-image">
                            <Profilepic id={attrs.id} />
                            
                        </div>
                        <div className="detail-idblock">
                            <div className="detail-name">{attrs.name}</div>
                            <a href={`https://game-rainbow6.ubi.com/en-gb/uplay/player-statistics/${attrs.id}/multiplayer`}
                                className="detail-id"
                                title="show on uplay">
                                {attrs.id}
                            </a>
                            <div className="detail-level">level {attrs.level}</div>
                        </div>
                    </div>
                    <div className="detail-timeblock">
                        <div className="detail-firstseen">
                            <span className="label">added:</span>
                            <span className="value">{moment(attrs.created_at).format(DATE_SHORT)}</span>
                        </div>
                        <div className="detail-lastseen">
                            <span className="label">last active:</span>    
                            <span className="value">{moment(attrs.lastPlayed).fromNow()}</span>
                        </div>
                    </div>
                </div>
                <div className="detail-content">
                    <Tabs headers={tabMap}>
                        <Overview key="tab1" {...attrs}/>
                        <div key="tab2">tab2content</div>
                        <div key="tab3">tab3content</div>
                        <div key="tab4">tab4content</div>
                    </Tabs>    
                </div>
            </div>
        );
    }
};

/*

<a href={`https://game-rainbow6.ubi.com/en-gb/uplay/player-statistics/${attrs.id}/multiplayer`} className="detail-id" title="show on uplay">
    {attrs.id}
</a>



 */