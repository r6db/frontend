const m = require("mithril");
const Result = require("./Result");
const { findPlayer } = require("lib/player");
const { getStats } = require("lib/stats");

const setQuerystring = state => {
	let current = ("" + window.location.href).replace(/\?.*$/, "");
	let query = `?query=${state.query()}&exact=${state.exact()}`
	let url = current + query;
	history.replaceState(null,  window.title, url);
}

module.exports = {
	results: m.prop([]),
	query: m.prop(""),
	exact: m.prop(false),
	stats: m.prop(null),
	stateClasses: m.prop(""),
	oninit: vnode => {
		let state = vnode.state;
		getStats().run(state.stats);


		state.onEnter = e => {
			if(e.keyCode !== 13) {
				return;
			}
			else {
				state.query(e.target.value);
				state.onSearch(e);
			}
		}
		state.onSearch = e => {
			if(state.query() === "" || state.query().length < 3) {
				// reset to initial state
				state.stateClasses("");
				return;
			} else if(state.stateClasses() !== "has-results") {
				// set the "is-searching" class only if we were not in the
				// "has-results" state
				state.stateClasses("is-searching");
			}
			// clear results
			state.results([]);
			// update url
			setQuerystring(state);
			// trigger the search
			findPlayer(state.query(), { isExact: state.exact() })
				.run(state.results)
				.run(() => state.stateClasses("has-results"))
				.catch(err => console.error(err))
		}
	},
	view: ({ state }) =>(
		<div className={"search " + state.stateClasses()}>
			<div className="search-background">
				<img src="/assets/skullrain-skull.jpg" alt=""/>
			</div>
			<h1 className="title is-1 search-title">Git Gud Scrub</h1>
			<div className="columns is-gapless search-form">
				<div className="column is-small-8 search-input">
					<input type="text"
						oninput={m.withAttr("value", state.query)}
						onkeypress={state.onEnter}/>
					<span>
						<input type="checkbox"
							id="exactSearch"
							onchange={m.withAttr("checked", state.exact)}/>
						<label htmlFor="exactSearch">exact</label>
					</span>
				</div>
				<button className="column is-small-1 button is-dark" onclick={state.onSearch}>Search</button>
			</div>
			<div className="colums is-multiline search-results">
				{state.results().map(res => <Result player={res} />)}
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
