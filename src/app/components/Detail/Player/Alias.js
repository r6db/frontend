const m = require("mithril");
const moment = require("moment");

module.exports = {
	view: ({ attrs }) => (
		<div className="alias" >
			<div className="alias-time">
			{
				attrs.alias.created_at
					? moment(attrs.alias.created_at).calendar()
					: "no Date"
			}
			</div>
			<div className="alias-name">{attrs.alias.name}</div>
		</div>
	)
};
