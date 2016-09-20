// sets the query string from the current state
const setQuerystring = state => {
	let current = ("" + window.location.href).replace(/\?.*$/, "");
	let query = `?query=${state.query()}&exact=${state.exact()}&focus=${state.focus()}`
	let url = current + query;
	history.replaceState(null,  window.title, url);
}

const getQuerystring = () => {
	let qs = window.location.href.split("?");
	let current = qs[qs.length - 1].split("&");
	return current.reduce(function(acc, curr) {
		let pair = curr.split("=");
		let key = pair[0];
		let val = pair[1];
		if(key.substr(-2) === "[]") {
			if(Array.isArray(acc[key]) === false ){
				acc[key] = [val];
			}
			else {
				acc[key].push(val);
			}
		} else {
			acc[key] = val;
		}
		return acc;
	}, {});
}

module.exports = {
	getQuerystring,
	setQuerystring
}
