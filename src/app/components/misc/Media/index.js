import * as m from "mithril";
import lozad from "lozad";
import "./media.scss";

const Media = {
    oninit({ attrs, state, dom }) {
        state.img = attrs.img;
        state.onerror = e => {
            e.preventDefault();
            e.stopPropagation();
            state.img = "/assets/noavatar.svg";
            e.target.src = "/assets/noavatar.svg";
        };
    },
    oncreate() {
        const observer = lozad(".profile-pic");
        observer.observe();
    },
    view({ attrs, state, children }) {
        return m(".media", [
            attrs.img ? m("img.media__image", { src: state.img }) : null,
            m(".media__content", [
                m(".media__contentheader", [
                    m("header.media__header", attrs.title),
                    attrs.label ? m("span.media__label", attrs.label) : null,
                ]),
                m(".media__text", children),
            ]),
        ]);
    },
};

export default Media;
