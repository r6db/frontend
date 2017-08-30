import * as m from "mithril";

const getWL = o => (((o.won / (o.won + o.lost)) * 100) || 0).toFixed(2);
const getKD = o => ((o.kills / o.deaths) || 0).toFixed(2);

export default {
    view: ({ attrs }) => attrs.player.stats != null
        ? (<div className="profile-casualstats card">
            <header className="card-header">Casual Stats</header>
            <div className="card-content">
                <div className="row">
                    <div className="label">Wins</div>
                    <div className="value">{attrs.player.stats.casual.won}</div>
                </div>
                <div className="row">
                    <div className="label">Losses</div>
                    <div className="value">{attrs.player.stats.casual.lost}</div>
                </div>
                <div className="row">
                    <div className="label">Win rate</div>
                    <div className="value">{
                        getWL(attrs.player.stats.casual)
                    }%</div>
                </div>
                <div className="row">
                    <div className="label">Kills</div>
                    <div className="value">{attrs.player.stats.casual.kills}</div>
                </div>
                <div className="row">
                    <div className="label">Deaths</div>
                    <div className="value">{attrs.player.stats.casual.deaths}</div>
                </div>
                <div className="row">
                    <div className="label">K/D ratio</div>
                    <div className="value">{
                        getKD(attrs.player.stats.casual)
                    }</div>
                </div>
            </div>
        </div>)
        : ""
};
