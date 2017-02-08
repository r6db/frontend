import m from "mithril";

export default {
    view({attrs}) {
        return m("button.tab-header", {
            role: "button",
            onclick: attrs.onclick,
            class: attrs.selected ? "is-selected" : ""
        }, attrs.header);
    }
};