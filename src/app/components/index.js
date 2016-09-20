const m = require("mithril");
const Result = require("./Result");
const Detail = require("./Detail");
const { getQuerystring, setQuerystring } = require("lib/querystring");
const { findPlayer, getPlayer } = require("lib/player");
const { getStats } = require("lib/stats");
const log = require("lib/log").child(__filename);
const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;

const State = Object.freeze({
	INITIAL: "",
	SEARCH: "is-searching",
	RESULTS: "has-results",
	DETAIL: "has-detail-open"
});

const init = state => {
	let query = getQuerystring();
	// accept legacy urls
	if(window.location.href.indexOf("/#/player/") !== -1) {
		let id = window.location.href
			.split("/#/player/")[1]
			.split("?")[0]
			.replace(/\//g,"");
		query.query = id;
	}
	log.trace("init", query);
	state.query(query.query || "");
	state.exact(query.exact === "true" ? true : false);
	state.onSearch();
}


module.exports = {
	status: m.prop(""),				// the current app state (used for css animations)
	results: m.prop([]),			// the search results
	focus: m.prop(""),				// the focused playes' id (for query string)
	detail: m.prop(null),			// the focues player object
	query: m.prop(""),				// the current search
	exact: m.prop(false),			// if the search should go by exact name
	stats: m.prop(null),			// db stats
	onSearch: () => void 0,			// search function (gets replaced in oninit)
	onEnter: () => void 0,			// enter keylistener (gets replaced in oninit)
	setFocus: () => void 0,		// shows the details for a player (replaced in oninit)
	hideFocus: () => void 0,	// hides the sidebar (gets replaced in oninit)
	onKeypress: () => void 0,		// global keylistener (gets replaced in oninit)
	oninit: vnode => {
		log.trace("start oninit");
		let state = vnode.state;
		getStats().run(state.stats);

		/**
		 * simple keylistener to trigger the search on enter keypress
		 */
		state.onEnter = e => {
			if(e.keyCode === 13) {
				log.trace("onEnter");
				state.query(e.target.value);
				state.onSearch(e);
			}
		}
		/**
		 * open the sidebar with a players' details
		 */
		state.setFocus = player => e => {
			log.trace("setFocus", player);
			state.focus(player.id);
			state.detail(player);
			state.status(State.DETAIL);
			setQuerystring(state);
		},
		/**
		 * hides the sidebar
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */
		state.hideFocus = e => {
			log.trace("hideFocus");
			state.focus("");
			state.detail(null);
			state.status(State.RESULTS);
			setQuerystring(state);
		}
		/**
		 * triggers the search
		 */
		state.onSearch = e => {
			log.trace("starting onSearch");
			if(idRegex.test(state.query())) {
				log.trace("search is id");
				if(state.status() !== State.RESULTS) {
					state.status(State.SEARCH);
				}
				// clear results
				state.results([]);
				// update url
				setQuerystring(state);
				// trigger the search
				getPlayer(state.query(), { isExact: state.exact() })
					.run(res => [res])
					.run(state.results)
					.run(res => {
						if(res.length === 1) {
							state.focus(state.query());
							state.detail(res[0]);
							state.status(State.RESULTS);
							log.trace("set result of id query");
						}
					})
					.run(() => state.status(State.RESULTS))
					.catch(err => console.error(err));
				return;
			}
			if(state.query() === "" || state.query().length < 3) {
				// reset to initial state
				log.trace("no query. resetting to default");
				state.status(State.INITIAL);
				setQuerystring(state);
				return;
			} else {
				// set the "is-searching" class only if we were not in the
				// "has-results" state
				if(state.status() !== State.RESULTS) {
					state.status(State.SEARCH);
				}
				log.trace("searching by name")
				// clear results
				state.results([]);
				// update url
				setQuerystring(state);
				// trigger the search
				findPlayer(state.query(), { isExact: state.exact() })
					.run(state.results)
					.run(() => state.status(State.RESULTS))
					.run(() => log.trace("set result of name query"))
					.catch(err => console.error(err))
			}

		}
		window.addEventListener("keyup", e => {
			if(e.keyCode === 27) {
				log.trace("attempting to close overlay");
				if(state.detail()) {
					state.hideFocus();
					m.redraw();
				}

			}
		});
		window.addEventListener("hashchange", () => init(state));
		init(state);
		log.trace("end oninit")
	},
	view: ({ state }) =>(
		<div className={`app ${state.status()}`} onkeyup={state.onKeypress}>
			<div className="search">
				<div className="search-background">
					<img src="/assets/skullrain-skull.jpg" alt=""/>
				</div>
				<h1 className="title is-1 search-title">Git Gud Scrub</h1>
				<div className="columns is-gapless search-form">
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
					<button className="column is-small-1 button is-dark" onclick={state.onSearch}>Search</button>
				</div>
				<div className="colums is-multiline search-results">
					{state.results().map(player => <Result player={player} onClick={state.setFocus(player)} key={player.id}/>)}
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
			<Detail player={state.detail} onBackdropClick={state.hideFocus}/>
		</div>
	)
}
