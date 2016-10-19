const { baseurl } = require("lib/constants");
const { failEarly } = require("../utils");
const leven = require("lib/levenshtein");
const { register } = require("../method");


const sortByLevenshtein = (base, data ) => data.sort(function(a, b) {
	return leven(a.name.toLowerCase(), base.toLowerCase()) -
		leven(b.name.toLowerCase(), base.toLowerCase());
});

const find = params => fetch(`${baseurl}api/player/${params.name}?${params.exact ? "exact=true" : ""}`)
	.then(failEarly)
	.then(res => res.json());

const process = (players, params) => sortByLevenshtein(params.name, players);

register("findPlayer")
	.acquire(find)
	.process(process);
