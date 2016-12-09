const Baobab = require("baobab");
const constants = require("./constants");

const defaultState = {
    appstate: constants.State.INITIAL,
    loading: false,
    detail: null,
    search: {
        query: "",
        exact: false
    }
};

const store = new Baobab(window.__INITIALSTATE || defaultState);

if (process.env.NODE_ENV === "development") {
    window.store = store;
}

module.exports = store;
