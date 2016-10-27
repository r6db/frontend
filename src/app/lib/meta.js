const { title, State } = require("./constants");


let home = {
	title: () => title,
	description: () => "R6DB is a fan-powered database for Rainbow Six: Siege PC" 
};

let search = {
	title: name => `Search results for  ${name} | R6DB`,
	description: name => `Search players named ${name} on R6DB`
};

let detail = {
	title: name => `${name} | R6DB`,
	description: name => `Show player details and stats for ${name}`
};

let valueMap = {
	[State.INITIAL]: home,
	[State.SEARCH]: search,
	[State.RESULT]: search,
	[State.DETAIL]: detail
};


module.exports = function(state, name) {
	let mapping = valueMap[state];
	if(mapping) {
		document.title = mapping.title(name);
		let meta = document.getElementById("meta_desc");
		if(meta) {
			meta.content = mapping.description(name);
		}
	}
};