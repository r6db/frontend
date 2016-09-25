const m = require("mithril");

const fallback = "/assets/noavatar.png"

module.exports = {
	onError: e => e.target.src = fallback,
	oncreate: ({ attrs, dom }) => {
		if(attrs.id) {
			let src = `http://uplay-avatars.s3.amazonaws.com/${attrs.id}/default_146_146.png`;
			if(!attrs.delay) {
				dom.src = src;
			} else {
				let delay = ((attrs.delay/10) | 0) * 1000;
				setTimeout(function(){
					dom.src = src;
					m.redraw();
				}, delay);
			}
		}
	},
	view: vnode => m("img", {src: fallback, onerror: vnode.state.onError})
}
