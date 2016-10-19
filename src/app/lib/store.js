const Baobab = require("baobab");
const constants = require("./constants");

const defaultState = {
	appstate: constants.State.INITIAL,
	detail: null,
	search: {
		query: "",
		exact: false
	}
};

let store = new Baobab(window.__INITIALSTATE || defaultState);

if(process.env.NODE_ENV === "development") {
	window.store = store;
}

module.exports = store;
