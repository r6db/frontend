import * as m from "mithril";

const getWL = o => (((o.won / (o.won + o.lost + (o.abandoned || 0))) * 100) || 0).toFixed(2);
const getKD = o => ((o.kills / o.deaths) || 0).toFixed(2);

export default {
    view: ({ attrs }) => attrs.player.stats != null
        ? (<div className="profile-rankedstats card">
            <header className="card-header">Ranked Stats</header>
            <div className="card-content">
                <div className="row">
                    <div className="label">Wins</div>
                    <div className="value">{attrs.player.stats.ranked.won}</div>
                </div>
                <div className="row">
                    <div className="label">Losses</div>
                    <div className="value">{attrs.player.stats.ranked.lost}</div>
                </div>
                <div className="row">
                    <div className="label">Abandons</div>
                    <div className="value">{attrs.player.stats.ranked.abandons}</div>
                </div>
                <div className="row">
                    <div className="label">Win rate</div>
                    <div className="value">{
                        getWL(attrs.player.stats.ranked)
                    }%</div>
                </div>
                <div className="row">
                    <div className="label">Kills</div>
                    <div className="value">{attrs.player.stats.ranked.kills}</div>
                </div>
                <div className="row">
                    <div className="label">Deaths</div>
                    <div className="value">{attrs.player.stats.ranked.deaths}</div>
                </div>
                <div className="row">
                    <div className="label">K/D ratio</div>
                    <div className="value">{
                        getKD(attrs.player.stats.ranked)
                    }</div>
                </div>
            </div>
        </div>)
        : ""
};
