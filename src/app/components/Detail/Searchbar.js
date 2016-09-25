const m = require("mithril");
const page = require("page");

module.exports = {
	query: m.prop(""),
	exact: m.prop(false),
	oninit: function({ state }){
		state.onEnter = state.onEnter = e => {
			if(e.keyCode === 13) {
				state.query(e.target.value);
				state.onSearch(e);
			}
		}
		state.onSearch = function(){
			let q = state.query();
			let e = state.exact();
			if(q.length > 2){
				page(`/search?query=${q}&exact=${e}`);
			}
		}
	},
	onremove: ({ state }) => {
		state.query("");
		state.exact(false);
	},
	view: ({ state }) => (
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
}
