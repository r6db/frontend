const m = require("mithril");
const moment = require("moment");
const secToHours = sec => moment.duration(sec || 0, "seconds")
    .asHours()
    .toFixed(2) + " hours";

module.exports = {
    view: ({ attrs }) => attrs.player.lastPlayed
        ? (<div className="detail-timeplayed module">
            <header className="module-header">Time played</header>
            <div className="module-row">
                <div className="module-label">Casual</div>
                <div className="module-value">
                    {secToHours(attrs.player.lastPlayed.casual)}
                </div>
            </div>
            <div className="module-row">
                <div className="module-label">Ranked</div>
                <div className="module-value">
                    {secToHours(attrs.player.lastPlayed.ranked)}
                </div>
            </div>
            <div className="module-row">
                <div className="module-label">Total</div>
                <div className="module-value">
                    {secToHours(attrs.player.lastPlayed.casual + attrs.player.lastPlayed.ranked)}
                </div>
            </div>
        </div>)
        : ""
};
