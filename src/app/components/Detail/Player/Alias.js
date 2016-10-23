const m = require("mithril");
const moment = require("moment");

const getClasses = alias => {
	let classes = ["alias"];
	if(alias.hasOverlaps) { classes.push("has-overlaps"); }
	if(alias.isMigrated) { classes.push("is-migrated"); }
	return classes.join(" ");
};

module.exports = {
	view: ({ attrs }) => (
		<div className={getClasses(attrs.alias)} >
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
