const m = require("mithril");
const page = require("page");
const Result = require("./Result");
const Searchbar = require("../misc/Searchbar");
const { getQuerystring } = require("lib/querystring");
const api = require("lib/api");
const store = require("lib/store");
const { title, State } = require("lib/constants");

const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);
const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;


const showPlayer = id => `/player/${id}`;

let search = store.select("search");


module.exports = {
	results: m.prop([]),			// the search results
	onbeforeremove: exitAnim,
	oninit: ({ attrs, state }) => {
		log.trace("<Search /> oninit");
		/**
		 * simple keylistener to trigger the search on enter keypress
		 */
		state.runSearch = function() {
			state.results([]);
			log.trace("running search");
			return api("findPlayer", { name: search.get("query"), exact: search.get("exact")})
				.then(state.results)
				.then(() => store.set("appstate", State.RESULT))
				.then(() => log.trace("search finished"))
				.then(function() {
					// this is a weird workaround.
					// it won't trigger the animation. and stay hidden
					// a redraw fixes that
					requestAnimationFrame(m.redraw);
				})
				.catch(err => console.error(err));
		};
		state.runSearch();
		search.on("update", state.runSearch);
	},
	onremove: ({ state }) => {
		log.trace("<Search /> onremove");
		state.results([]);
		search.off("update", state.runSearch);
	},
	view: ({ attrs, state }) => (
		<div className="search">
			<h1 className="title is-1 search-title">R6DB</h1>
			<Searchbar search={attrs.store.select("search")} />
			<div className="colums is-multiline search-results">
				{state.results().map((player, i, total) => <Result player={player} index={i} key={player.id} href={showPlayer(player.id)}/>)}
			</div>
		</div>
	)
};
