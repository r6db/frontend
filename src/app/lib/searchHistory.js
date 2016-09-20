const app = require("app");
const pull = require("lodash/pull");

function Searchhistory() {
	this.history = [];
	this.push = function(name) {
		pull(this.history, name);
		this.history.unshift(name);
		if (this.history.length > 5) {
			this.history.pop();
		}
		this.persist();
	};
	this.persist = function() {
		window.localStorage.setItem("searchhistory", JSON.stringify(this.history));
	};
	this.load = function() {
		try {
			this.history = JSON.parse(window.localStorage.getItem("searchhistory")) || [];
		} catch (e) {
			this.history = [];
		}
	};
	this.load();
}

module.exports = Searchhistory();
