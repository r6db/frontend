const app = require("app");
const constants = require("../constants");

function User($http) {
	const self = this;
	this.user = null;
	this.logout = function() {
		this.user = null;
		$http.post(constants.baseurl + "api/logout");
	};
	this.get = function() {
		return $http.get(constants.baseurl + "api/me")
			.then(function(res) {
				self.user = res.data;
				return res.data;
			});
	};
	this.login = function() {
		$window.location.href = constants.baseurl + "api/auth/google";
	};
};

User.$inject = ["$http"]

app.service("User", User);
module.exports = "User";
