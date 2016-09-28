const m = require("mithril");
const Searchbar = require("./Searchbar");
const api = require("lib/api");
const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);
module.exports = {
	player: null,
	onbeforeremove: exitAnim,
	onremove: ({ state }) => {
		log.trace("<Detail /> onremove")
		state.player(null);
	},
	oninit: ({ attrs, state }) => {
		log.trace("<Detail /> oninit");
		let ctx = attrs.context();
		if(ctx.params && ctx.params.id){
			log.trace("getting player data", ctx.params.id);
			api("getPlayer", { id: ctx.params.id})
				.then(function(res) {
					log.trace("got player", ctx.params.id)
					return res;
				})
				.then(res => state.player = res)
				.then(() => m.redraw());
		} else {
			log.warn("no id given to <Detail />");
		}
	},
	view: ({ attrs, state }) => (
		<div className="detail">
			<Searchbar />
		{
			state.player
			? (
				<div className="player-name">{state.player.name}</div>
			)
			: "loading"
		}
		</div>)
}
