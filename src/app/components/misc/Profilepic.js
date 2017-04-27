import m from "mithril";
import { isConsole } from "lib/constants";
export default {
    timeout: false,
    onerror: e => {
        e.preventDefault();
        e.stopPropagation();
        e.target.src = "/assets/noavatar.svg";
    },
    oncreate({ attrs, state, dom }) {
        if (attrs.id && !isConsole) {
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
        clearTimeout(vnode.state.timeout);
    },
    view: vnode => m("img", { src: "/assets/noavatar.svg", onerror: vnode.state.onerror })
};
