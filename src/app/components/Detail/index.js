const m = require("mithril");
const Searchbar = require("../misc/Searchbar");
const Player = require("./Player");

const log = require("lib/log").child(__filename);

module.exports = {
	onremove: ({ state }) => {
		log.trace("<Detail /> onremove");
	},
	oninit: ({ attrs, state }) => {
		log.trace("<Detail /> oninit");
	},
	view: ({ attrs, state }) => (
		<div className="detail">
			<Searchbar search={attrs.store.select("search")} />
			{
				attrs.store.get("detail")
				? <Player id={attrs.store.get("detail")} store={attrs.store} />
				: <Placeholder />
			}
		</div>
	)
};
