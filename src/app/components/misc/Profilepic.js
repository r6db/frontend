const m = require("mithril");

const fallback = "/assets/noavatar.png";

module.exports = {
    timeout: false,
    onError: e => {
        e.preventDefault();
        e.stopPropagation();
        e.target.src = fallback;
        return false;
    },
    oncreate: ({ attrs, state, dom }) => {
        if (attrs.id) {
            const src = `//uplay-avatars.s3.amazonaws.com/${attrs.id}/default_146_146.png`;
            const delay = (((attrs.delay || 0) / 9) | 0) * 2000;
            state.timeout = setTimeout(function () {
                if (dom) {
                    dom.src = src;
                }
            }, delay);
        }
    },
    onremove: vnode => {
        vnode.dom.src = fallback;
        clearTimeout(vnode.state.timeout);
    },
    view: vnode => m("img", { src: fallback, onerror: vnode.state.onError })
};
