module.exports = function({ dom }, done){
	let dupe = dom.cloneNode(true);
	dom.insertAdjacentElement("afterend", dupe);
	done();
	setTimeout(function() {
		dupe.parentElement.removeChild(dupe);
	}, 1000)
}
