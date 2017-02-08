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
                <div className="player-left">
                    <CurrentRank className=""
                            rank={topRank.rank}
                            region={topRank.label}/>
                    <Aliases aliases={attrs.aliases}/>
                </div>
                <div className="player-main">
                    <div className="player-summary"><StatSummary {...attrs}/></div>
                    <div className="player-stuff">
                        <Timeline className="player-timeline" {...attrs} />
                        <div className="player-right">
                            <div className="player-topops">top ops</div>
                            <div className="player-gamemodes">game modes</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};