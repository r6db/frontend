const { baseurl } = require("../../constants");
const checkStatus = require("../status");
const leven = require("lib/levenshtein");

const sortByLevenshtein = base => data => data.sort(function(a, b) {
	return leven(a.name.toLowerCase(), base.toLowerCase()) -
		leven(b.name.toLowerCase(), base.toLowerCase());
});

module.exports.get = ({ id }) =>
	fetch(`${baseurl}api/id/${id}`)
	.then(checkStatus)
	.then(res => res.json());

module.exports.find = ({ name, exact }) =>
	fetch(`${baseurl}api/player/${name}?${exact ? "exact=true" : ""}`)
	.then(checkStatus)
	.then(res => res.json())
	.then(sortByLevenshtein(name));
