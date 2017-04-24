import m from "mithril";

const getWL = o => ((o.won / (o.won + o.lost)) * 100).toFixed(2);
const getKD = o => (o.kills / o.deaths).toFixed(2);

module.exports = {
    view: ({ attrs }) => attrs.player.stats != null
        ? (<div className="detail-casualstats module">
            <header className="module-header">Casual Stats</header>
            <div className="module-row">
                <div className="module-label">Wins</div>
                <div className="module-value">{attrs.player.stats.casual.won}</div>
            </div>
            <div className="module-row">
                <div className="module-label">Losses</div>
                <div className="module-value">{attrs.player.stats.casual.lost}</div>
            </div>
            <div className="module-row">
                <div className="module-label">Win rate</div>
                <div className="module-value">{
                    getWL(attrs.player.stats.casual)
                }%</div>
            </div>
            <div className="module-row">
                <div className="module-label">Kills</div>
                <div className="module-value">{attrs.player.stats.casual.kills}</div>
            </div>
            <div className="module-row">
                <div className="module-label">Deaths</div>
                <div className="module-value">{attrs.player.stats.casual.deaths}</div>
            </div>
            <div className="module-row">
                <div className="module-label">K/D ratio</div>
                <div className="module-value">{
                    getKD(attrs.player.stats.casual)
                }</div>
            </div>
        </div>)
        : ""
};
