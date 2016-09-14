const app = require("app");
const { baseurl } = require("../constants");



function Stats($http) {
	this.get = function() {
		return $http.get(`${baseurl}api/stats`)
			.then(res => res.data)
	};
};

Stats.$inject = ["$http"]

app.service("Stats", Stats);
module.exports = "Stats";
