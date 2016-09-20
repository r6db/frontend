const m = require("mithril");
const { baseurl } = require("../constants");

function getStats() {
	return m.request({
		url: `${baseurl}api/stats`,
		method: "GET"
	})
}

module.exports = {
	getStats
}
