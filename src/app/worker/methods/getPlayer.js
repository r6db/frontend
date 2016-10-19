const { baseurl } = require("lib/constants");
const { failEarly } = require("../utils");
const { register } = require("../method");

const fixAlias = alias => {
	// eslint-disable-next-line camelcase
	alias.created_at = alias.created_at
		? new Date(alias.created_at)
		: null;
	return alias;
};


const find = ({ id }) => fetch(`${baseurl}api/id/${id}`)
	.then(failEarly)
	.then(res => res.json());

const process = player => {
	player.aliases = player.aliases
		.sort((a, b) => b.created_at - a.created_at)
		.map(fixAlias);
	return player;
};

register("getPlayer")
	.acquire(find)
	.process(process);
