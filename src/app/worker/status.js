module.exports = function checkStatus(res) {
	if(!res.ok) {
		throw res.json();
	} else {
		return res;
	}
}
