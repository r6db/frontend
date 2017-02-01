import m from "mithril";
import CurrentRank from "./CurrentRank";
import StatSummary from "./StatSummary";
import RankedSummary from "./RankedSummary";

import "./overview.scss";

export default {
    view({attrs}) {
        return (
            <div className="player-overview">
                <div className="col col-side">
                    <div className="player-currentranks">{
                        attrs.regionByGameCount
                            .reduce((acc, curr) => { 
                                const region = attrs.rank[curr];
                                return region.rank
                                    ? acc.concat(m(CurrentRank, {
                                        class: "player-currentrank",
                                        key: region.label,
                                        rank: region.rank,
                                        region: region.label
                                    }))
                                    : acc;
                            }, [])
                    }</div>
                    <div className="card">
                        aliases here!
                    </div>  
                </div>
                <div className="col col-main">
                    <div className="player-summary"><StatSummary {...attrs}/></div>
                    <div className="player-stuff">
                        <div className="player-timeline">timeline here</div>
                        <div className="player-gamemodes"> game modes here?</div>
                    </div>
                </div>
            </div>
        );
    }
};