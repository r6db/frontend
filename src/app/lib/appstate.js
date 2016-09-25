const m = require("mithril");

module.exports.states = Object.freeze({
	INITIAL: "is-initial",
	SEARCH: "is-searching",
	RESULT: "is-results",
	DETAIL: "is-detail"
});
module.exports.appstate = m.prop("is-initial");
