const m = require("mithril");

const fallback = "/assets/noavatar.png"

module.exports = {
	onError: e => e.target.src = fallback,
	src: fallback,
	oninit: vnode => {
		vnode.state.src = vnode.attrs.id
			? `http://uplay-avatars.s3.amazonaws.com/${vnode.attrs.id}/default_256_256.png`
			: fallback;
	},
	view: vnode => m("img", {src:vnode.state.src, onerror: vnode.state.onError})
}
