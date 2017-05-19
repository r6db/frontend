import * as m from "mithril";

const getWL = o => ((o.won / (o.won + o.lost)) * 100).toFixed(2);
const getKD = o => (o.kills / o.deaths).toFixed(2);
export default {
    view: ({ attrs }) => attrs.player.stats != null
        ? (<div className="detail-generaltats module">
            <header className="module-header">General Stats</header>
            <div className="module-content">
                <div className="module-row">
                    <div className="module-label">Wins</div>
                    <div className="module-value">{attrs.player.stats.general.won}</div>
                </div>
                <div className="module-row">
                    <div className="module-label">Losses</div>
                    <div className="module-value">{attrs.player.stats.general.lost}</div>
                </div>
                <div className="module-row">
                    <div className="module-label">Win rate</div>
                    <div className="module-value">{
                        getWL(attrs.player.stats.general)
                    }%</div>
                </div>
                <div className="module-row">
                    <div className="module-label">Kills</div>
                    <div className="module-value">{attrs.player.stats.general.kills}</div>
                </div>
                <div className="module-row">
                    <div className="module-label">Deaths</div>
                    <div className="module-value">{attrs.player.stats.general.deaths}</div>
                </div>
                <div className="module-row">
                    <div className="module-label">K/D ratio</div>
                    <div className="module-value">{
                        getKD(attrs.player.stats.general)
                    }</div>
                </div>
            </div>
        </div>)
        : ""
};
