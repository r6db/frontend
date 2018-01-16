import * as m from "mithril";
import Page from "components/misc/Page";
import rip from "./rip.jpg";

export default {
    view({ attrs, children }) {
        return m(Page, { image: rip }, [
            m(Page.Head, [m(".container", [m("h1.header", attrs.title)])]),
            m(Page.Content, [m(".container", children)]),
        ]);
    },
};
