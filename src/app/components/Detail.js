const m = require("mithril");
const player = require("lib/player");

module.exports = {

	view: ({ attrs }) => (
		<div className="detail">
		<div className="detail-content">
			{
				attrs.player()
				? (
					<div className="player-name">{attrs.player().name}</div>
				)
				: "no player selected"
			}
		</div>
		<div className="detail-backdrop" onclick={attrs.onBackdropClick}></div>
		</div>)
}
