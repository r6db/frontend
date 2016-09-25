const m = require("mithril");
const page = require("page");
const Result = require("./Result");
const { getQuerystring } = require("lib/querystring");
const { findPlayer, getPlayer } = require("lib/player");
const { getStats } = require("lib/stats");
const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);
const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;

const setQuerystring = state => {
	let q = state.query();
	let e = state.exact();
	if(q.length > 3){
		page(`/search?query=${q}&exact=${e}`);
	}
}

const State = Object.freeze({
	INITIAL: "",
	SEARCH: "is-searching",
	RESULTS: "has-results"
});

const showPlayer = id => e => page("/player/"+id);

module.exports = {
	status: m.prop(""),				// the current app state (used for css animations)
	results: m.prop([]),			// the search results
	query: m.prop(""),				// the current search
	exact: m.prop(false),			// if the search should go by exact name
	stats: m.prop(null),			// db stats
	onSearch: () => void 0,			// search function (gets replaced in oninit)
	onEnter: () => void 0,			// enter keylistener (gets replaced in oninit)
	onbeforeremove: exitAnim,
	oninit: ({ attrs, state }) => {
		state.results([]);
		getStats().run(state.stats);
		/**
		 * simple keylistener to trigger the search on enter keypress
		 */
		 const runSearch = function(setQs){
			 return findPlayer(state.query(), { isExact: state.exact() })
			 .run(state.results)
			 .run(() => state.status(State.RESULTS))
			 .run(() => setQs? setQuerystring(state): null)
			 .catch(err => console.error(err))
		 }
		state.onEnter = e => {
			if(e.keyCode === 13) {
				state.query(e.target.value);
				state.onSearch(e);
			}
		}
		/**
		 * triggers the search
		 */
		state.onSearch = e => {
			// use getPlayer if an id was entered
			if(idRegex.test(state.query())) {
				if(state.status() !== State.RESULTS) {
					state.status(State.SEARCH);
				}
				// clear results
				state.results([]);
				// update url
				// trigger the search
				getPlayer(state.query(), { isExact: state.exact() })
					.run(res => [res])
					.run(state.results)
					.run(res => {
						if(res.length === 1) {
							state.focus(state.query());
							state.detail(res[0]);
							state.status(State.RESULTS);
						}
					})
					.run(() => state.status(State.RESULTS))
					.run(() => setQuerystring(state))
					.catch(err => console.error(err));
				return;
			}
			// reset if no search was entered
			if(state.query() === "" || state.query().length < 3) {
				state.status(State.INITIAL);
				setQuerystring(state);
				return;
			} else {
				// update the search list
				// set the "is-searching" class only if we were not in the
				// "has-results" state
				if(state.status() !== State.RESULTS) {
					state.status(State.SEARCH);
				}
				log.trace("searching by name")
				// clear results
				state.results([]);
				// update url and trigger the search
				runSearch(true);
			}

		}
		let query = attrs.context().query || {};
		if(query.exact === "true") { state.exact(true)}
		if(query.query) {
			state.query(query.query);
			state.results([]);
			runSearch(false)
			.run(function(){
				// this is a weird workaround.
				// if we only have 1 result and reload the page
				// it won't trigger the animation.
				// a redraw fixes that
				requestAnimationFrame(function(){
					m.redraw();
				})
			})
		}
	},
	onremove: ({ state }) => {
		state.query("");
		state.exact(false);
		state.results([]);
	},
	view: ({ state }) =>(
		<div className={"search " + state.status()}>
			<div className="search-background">
				<img src="/assets/skullrain-skull.jpg" alt=""/>
			</div>
			<h1 className="title is-1 search-title">Git Gud Scrub</h1>
			<div className="search-form">
				<div className="column is-small-8 search-input">
					<input type="text"
						value={state.query()}
						oninput={m.withAttr("value", state.query)}
						onkeypress={state.onEnter}/>
					<span>
						<input type="checkbox"
							id="exactSearch"
							checked={state.exact()}
							onchange={m.withAttr("checked", state.exact)}/>
						<label htmlFor="exactSearch">exact name</label>
					</span>
				</div>
				<button className="search-submit" onclick={state.onSearch}>Search</button>
			</div>
			<div className="colums is-multiline search-results">
				{state.results().map(player => <Result player={player} onclick={showPlayer(player.id)}/>)}
			</div>
			<footer className="search-footer is-center">
				{
					state.stats()
					? (<span>
						{state.stats().usercount} users,
						{state.stats().namecount} names
					</span>)
					: null
				}
				<a href="mailto:info@gitgudscrub.com">info@gitgudscrub.com</a>
			</footer>
		</div>
	)
}
