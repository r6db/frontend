import m from "mithril";
import CurrentRank from "./CurrentRank";
import StatSummary from "./StatSummary";
import Aliases from "./Aliases";
import Timeline from "./Timeline";

import "./overview.scss";

export default {
    view({attrs}) {
        const topRank = attrs.rank[attrs.regionByGameCount[0]];

        return (
            <div className="player-overview">
                <div className="col col-side">
                    <CurrentRank className=""
                            rank={topRank.rank}
                            region={topRank.label}/>
                    <Aliases aliases={attrs.aliases}/>
                </div>
                <div className="col col-main">
                    <div className="player-summary"><StatSummary {...attrs}/></div>
                    <div className="player-stuff">
                        <Timeline className="player-timeline" {...attrs}/>
                        <div className="player-gamemodes"> game modes here?</div>
                    </div>
                </div>
            </div>
        );
    }
};