import * as m from "mithril";

const getWL = o => (((o.won / (o.won + o.lost + (o.abandoned || 0))) * 100) || 0).toFixed(2);
const getKD = o => ((o.kills / o.deaths) || 0).toFixed(2);

export default {
    view: ({ attrs }) => attrs.player.stats != null
        ? (<div className="detail-rankedstats module">
            <header className="module-header">Ranked Stats</header>
            <div className="module-content">
                <div className="module-row">
                    <div className="module-label">Wins</div>
                    <div className="module-value">{attrs.player.stats.ranked.won}</div>
                </div>
                <div className="module-row">
                    <div className="module-label">Losses</div>
                    <div className="module-value">{attrs.player.stats.ranked.lost}</div>
                </div>
                <div className="module-row">
                    <div className="module-label">Abandons</div>
                    <div className="module-value">{attrs.player.stats.ranked.abandons}</div>
                </div>
                <div className="module-row">
                    <div className="module-label">Win rate</div>
                    <div className="module-value">{
                        getWL(attrs.player.stats.ranked)
                    }%</div>
                </div>
                <div className="module-row">
                    <div className="module-label">Kills</div>
                    <div className="module-value">{attrs.player.stats.ranked.kills}</div>
                </div>
                <div className="module-row">
                    <div className="module-label">Deaths</div>
                    <div className="module-value">{attrs.player.stats.ranked.deaths}</div>
                </div>
                <div className="module-row">
                    <div className="module-label">K/D ratio</div>
                    <div className="module-value">{
                        getKD(attrs.player.stats.ranked)
                    }</div>
                </div>
            </div>
        </div>)
        : ""
};
