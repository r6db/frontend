const m = require("mithril");

module.exports = {
	onbeforeremove: ({ dom }, done) => {
		dom.classList.add("is-leaving");
		setTimeout(done, 400);
	},
	view: ({ state }) => (
		<div className="loading">
			<div className="loading-indicator"></div>
		</div>
	)
};
