const m = require("mithril");
const player = require("lib/player");
const Searchbar = require("./Searchbar");
const { getPlayer } = require("lib/player");
const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);
module.exports = {
	player: m.prop(null),
	runContext: function(ctx, next) {
		getPlayer(ctx.params.id)
			.run(res => ctx.player = res)
			.run(() => next());
	},
	onbeforeremove: exitAnim,
	onremove: ({ state }) => {
		state.player(null);
	},
	oninit: ({ attrs, state }) => {
		let ctx = attrs.context();
		if(ctx.params && ctx.params.id){
			getPlayer(ctx.params.id)
				.run(state.player);
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
