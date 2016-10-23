const { v2Api } = require("lib/constants");
const { failEarly, getHeaders } = require("../utils");
const { register } = require("../method");

const fixAlias = alias => {
	// eslint-disable-next-line camelcase
	alias.created_at = alias.created_at
		? new Date(alias.created_at)
		: null;
	return alias;
};


const find = ({ id }) => fetch(`${v2Api}/players/${id}`, { headers: getHeaders()})
	.then(failEarly)
	.then(res => res.json());

const process = player => {
	player.aliases = player.aliases
		.map(fixAlias)
		.sort((a, b) => b.created_at - a.created_at);
	return player;
};

register("getPlayer")
	.acquire(find)
	.process(process);
