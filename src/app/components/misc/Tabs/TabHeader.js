import m from "mithril";

export default {
    view({attrs}) {
        return m("div.tab-header", {
            onclick: attrs.onclick,
            class: attrs.selected ? "is-selected" : ""
        }, attrs.header);
    }
};