const m = require("mithril");
const moment = require("moment");
const secToHours = sec => moment.duration(sec || 0, "seconds")
	.asHours()
	.toFixed(2) + " hours";

module.exports = {
	view: ({ attrs }) => (
		<div className="detail-timestamps module">
			<header className="module-header">Timestamps</header>
			<div className="module-row">
				<div className="module-label">First added</div>
				<div className="module-value">
					{moment(attrs.player.created_at).fromNow()}
				</div>
			</div>
			{attrs.player.lastPlayed
				? (<div className="module-row">
					<div className="module-label">Last played</div>
					<div className="module-value">
						{attrs.player.lastPlayed.last_played
							? moment(attrs.player.lastPlayed.last_played).fromNow()
							: "-"}
					</div>
				</div>)
				: ""}
			<div className="module-row">
				<div className="module-label">Last updated</div>
				<div className="module-value">
					{moment(attrs.player.aliases[0].updated_at).fromNow()}
				</div>
			</div>
		</div>
	)
};
