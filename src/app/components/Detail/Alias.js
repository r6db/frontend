const m = require("mithril");

module.exports = {
	view: ({ attrs }) => (
		<div className="alias">
			<div className="alias-name">{attrs.alias.name}</div>
			<div className="alias-time">
			{
				attrs.alias.created_at
					? attrs.alias.created_at.toDateString()
					: "no Date"
			}
			</div>
		</div>
	)
};
