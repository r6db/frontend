import m from "mithril";
import CurrentRank from "./CurrentRank";
import "./overview.scss";

export default {
    view({attrs}) {
        return (
            <div className="player-overview">
                <div className="col col-side">
                    <div className="card">{
                        attrs.regionByGameCount
                            .reduce((acc, curr) => { 
                                const region = attrs.rank[curr];
                                return region.rank
                                    ? acc.concat(m(CurrentRank, {
                                        class: "divlayer-currentrank",
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
                    <div className="card player-summary"> wide card with stat summary here</div>
                    <div className="player-stuff">
                        <div className="card player-timeline">timeline here</div>
                        <div className="card player-gamemodes"> game modes here?</div>
                    </div>
                </div>
            </div>
        );
    }
};