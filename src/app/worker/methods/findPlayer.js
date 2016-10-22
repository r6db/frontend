const { v2Api } = require("lib/constants");
const { failEarly, getHeaders } = require("../utils");
const memoize = require("lodash/memoize");
const { register } = require("../method");

const timeDiff = time => new Date() - new Date(time);
const asRegex = string => {
	const res = string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
		.split("")
		.map(function (char) {
			switch (char.toLowerCase()) {
				case "i":
				case "l":
				case "1":
					return "[Il1]";
				case "O":
				case "0":
					return "[O0]";
				default:
					return char;
			}
		})
		.join("");
	return new RegExp(res, "i");
};

const Values = {
	EXACT: 50,
	START: 20,
	PARTIAL: 10,
	REGEX: 5,
	CURRENT_MODIFIER: 2,
	LOSS_PER_SECOND: (1/86400) * 0.001 // 86400 is the amount of seconds in a day. we lose 0.1% value per day
};

const aliasValue = (query, current) => alias => {
	let score = 0;
	if(alias.name === query) {
		score += Values.EXACT;
	} else if(alias.name.indexOf(query) === 0) {
		score += Values.START;
	} else if(alias.name.indexOf(query) !== -1) {
		score += Values.PARTIAL;
	} else if(asRegex(query).test(alias.name)) {
		score += Values.REGEX;
	}
	if(alias.name === current) {
		score * Values.CURRENT_MODIFIER;
	}
	score * (1-(Values.LOSS_PER_SECOND * timeDiff(alias.created_at)));
	return score;
};

const playerValue = query => memoize(player => {
	let val = player.aliases
		.map(aliasValue(query, player.name))
		.reduce((a, b) => a+b, 0);
	val = val * (1/player.aliases.length);
	return val;	
});

const sortByValue = (query, data) => {
	let sorter = playerValue(query);
	return data.sort((a, b) => sorter(b) - sorter(a));
};

let getUrl = params => `${v2Api}/players?name=${params.name}&exact=${params.exact ? "1" : "0"}`; 
const find = params => fetch( getUrl(params), { headers: getHeaders() })
	.then(failEarly)
	.then(res => res.json());

const process = (players, params) => sortByValue(params.name, players);

register("findPlayer")
	.acquire(find)
	.process(process);
