import * as Inferno from "inferno";

const getWL = o => (o.won / (o.won + o.lost) * 100).toFixed(2);
const getKD = o => (o.kills / o.deaths).toFixed(2);
export default {
    view: ({ attrs }) =>
        attrs.player.stats != null ? (
            <div className="profile-generalstats card">
                <header className="card__header">General Stats</header>
                <div className="card__content">
                    <div className="row">
                        <div className="label">Wins</div>
                        <div className="value">{attrs.player.stats.general.won}</div>
                    </div>
                    <div className="row">
                        <div className="label">Losses</div>
                        <div className="value">{attrs.player.stats.general.lost}</div>
                    </div>
                    <div className="row">
                        <div className="label">Win rate</div>
                        <div className="value">{getWL(attrs.player.stats.general)}%</div>
                    </div>
                    <div className="row">
                        <div className="label">Kills</div>
                        <div className="value">{attrs.player.stats.general.kills}</div>
                    </div>
                    <div className="row">
                        <div className="label">Deaths</div>
                        <div className="value">{attrs.player.stats.general.deaths}</div>
                    </div>
                    <div className="row">
                        <div className="label">K/D ratio</div>
                        <div className="value">{getKD(attrs.player.stats.general)}</div>
                    </div>
                </div>
            </div>
        ) : (
            ""
        ),
};
