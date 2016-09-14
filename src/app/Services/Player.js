const app = require("app");
const { baseurl } = require("../constants");
const leven = require("../lib/levenshtein");


const sortByLevenshtein = base => data => data.sort(function(a, b) {
	return leven(a.name.toLowerCase(), base.toLowerCase()) -
		leven(b.name.toLowerCase(), base.toLowerCase());
});



function Player($http) {
	this.find = function(name, {
		isExact
	}) {
		return $http.get(`${baseurl}api/player/${name}?${isExact?"exact=true":""}`)
			.then(res => res.data)
			.then(sortByLevenshtein(name))
	};
};

Player.$inject = ["$http"]

app.service("Player", Player);
module.exports = "Player";
