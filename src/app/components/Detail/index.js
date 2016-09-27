const m = require("mithril");
const Searchbar = require("./Searchbar");
const api = require("lib/api");
const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);
module.exports = {
	player: m.prop(null),
	onbeforeremove: exitAnim,
	onremove: ({ state }) => {
		state.player(null);
	},
	oninit: ({ attrs, state }) => {
		let ctx = attrs.context();
		if(ctx.params && ctx.params.id){
			api("getPlayer", { id: ctx.params.id})
				.then(function(res) {
					return res;
				})
				.then(state.player)
				.then(() => m.redraw());
		} else {
			log.warn("no id given to <Detail />");
		}
	},
	view: ({ attrs, state }) => (
		<div className="detail">
			<Searchbar />
		{
			state.player()
			? (
				<div className="player-name">{state.player().name}</div>
			)
			: "loading"
		}
		</div>)
}
