const m = require("mithril");
const page = require("page");
const { getQuerystring } = require("lib/querystring");
const api = require("lib/api");
const { appstate, states } = require("lib/appstate");
const { title } = require("../../constants");
const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);
const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;


const showPlayer = id => e => page("/player/"+id);

module.exports = {
	query: m.prop(""),				// the current search
	exact: m.prop(false),			// if the search should go by exact name
	stats: m.prop(null),			// db stats
	onSearch: () => void 0,			// search function (gets replaced in oninit)
	onEnter: () => void 0,			// enter keylistener (gets replaced in oninit)
	onbeforeremove: exitAnim,
	oncreate: ({dom}) => {
		dom.querySelector(".search-input input").focus();
	},
	oninit: ({ attrs, state }) => {
		log.trace("<Home /> oninit");
		api("getStats")
			.then(state.stats)
			.then(() => m.redraw());
		state.onEnter = e => {
			if(e.keyCode === 13) {
				state.query(e.target.value);
				state.onSearch(e);
			}
		};
		/**
		 * triggers the search
		 */
		state.onSearch = e => {
			// use getPlayer if an id was entered
			if(idRegex.test(state.query())) {
				log.trace("query is an id. redirecting to details");
				page("/player/"+state.query());
			}
			if(state.query().length > 3) {
				page(`/search?query=${state.query()}${state.exact() ? "?exact=true" : ""}`);
			}
		};
	},
	onremove: ({ state }) => {
		log.trace("<Home /> onremove");
		state.query("");
		state.exact(false);
	},
	view: ({ state }) => (
		<div className="search">
			<h1 className="title is-1 search-title">R6DB</h1>
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
};
