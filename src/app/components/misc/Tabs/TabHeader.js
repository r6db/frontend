import m from "mithril";

export default {
    view({ attrs }) {
        return m(
            "div.tab__header",
            {
                onclick: attrs.onclick,
                class: attrs.selected ? "tab__header--selected" : "",
            },
            attrs.header,
        );
    },
};
