import m from "mithril";
import CurrentRank from "./CurrentRank";
import "./overview.scss";

export default {
    view({attrs}) {
        return (
            <div className="player-overview">
                <div className="col col-left">
                    <div className="card">{
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
                    
                </div>
                <div className="col col-right">
                    main col!
                </div>
            </div>
        );
    }
};