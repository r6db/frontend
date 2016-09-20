const m = require("mithril");
const { baseurl } = require("../constants");
const leven = require("../lib/levenshtein");

const sortByLevenshtein = base => data => data.sort(function(a, b) {
	return leven(a.name.toLowerCase(), base.toLowerCase()) -
		leven(b.name.toLowerCase(), base.toLowerCase());
});

function findPlayer(name, { isExact } = {}) {
	return m.request({
		// url: `${baseurl}api/player?query=${name}&exact=${isExact?"true": "false"}`,
		url: `${baseurl}api/player/${name}?${isExact?"exact=true": ""}`,
		method: "GET"
	})
	.run(sortByLevenshtein(name));
}
function getPlayer(id)
 {
	 return m.request({
 		// url: `${baseurl}api/player/${id}`,
 		url: `${baseurl}api/id/${id}`,
 		method: "GET"
 	});
 }
module.exports = {
	findPlayer,
	getPlayer
};
