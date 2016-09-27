const { baseurl } = require("../../constants");
const checkStatus = require("../status");
module.exports.get = id =>
	fetch(`${baseurl}api/player/${id}`)
	.then(checkStatus)
	.then(res => res.json());

module.exports.find = ({ name, exact }) =>
	fetch(`${baseurl}api/player/${name}?${exact ? "exact=true" : ""}`)
	.then(checkStatus)
	.then(res => res.json())
	.then(function(players) {
	});
