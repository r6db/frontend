// sets the query string from the current state

const getQuerystring = query => {
	let qs = query || window.location.hash.split("?")[1];
	if(!qs){
		return {};
	}
	let current = qs.split("&");
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
	getQuerystring
}
