const m = require("mithril");
const player = require("lib/player");

const profile = player => (
	<div className="profile">
		{player.name}
	</div>
)

module.exports = {
	player: {},
	oninit: function(vnode) {
		player.getPlayer(vnode.attrs.id)
		.run(vnode.state.player)
	},
	view: vnode=> vnode.state.player() ? profile(vnode.state.player()): ""
}
