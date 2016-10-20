const m = require("mithril");
const page = require("page");
const log = require("lib/log").child(__filename);

module.exports = {
	query: m.prop(""),
	exact: m.prop(false),
	oninit: ({ attrs, state }) => {
		state.onEnter = state.onEnter = e => {
			if(e.keyCode === 13) {
				state.onSearch();
			}
		};
		state.onSearch = function() {

			let q = state.query();
			let e = state.exact();
			if(q.length > 2) {
				page(`/search/${q}${e ? "?exact=true": ""}`);
			}
		};
		log.trace("<Searchbar /> oninit", attrs.search.get());
		state.query(attrs.search.get("query"));
		state.exact(attrs.search.get("exact"));
	},
	onremove: ({ state }) => {
		state.query("");
		state.exact(false);
	},
	view: ({ attrs, state }) => (
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
	)
};
