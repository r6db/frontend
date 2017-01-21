import m from "mithril";

export default {
    view({ attrs }) {
        return m("svg.icon", {
            viewBox: attrs.viewBox,
            preserveAspectRatio: attrs.preserveAspectRatio,
            class: attrs.class,
            fill: attrs.fill,
            stroke: attrs.stroke
        }, [
            m(`use[xlink:href=${attrs.glyph}]`)
        ]);
    }
};

export const GLYPHS = {
    LOGO: require("assets/logo.svg"),
    NOAVATAR: require("assets/noavatar.svg"),
    BG: require("assets/bg_prim.svg"),
    RANK0: require("assets/ranks/0.svg"),
    RANK1: require("assets/ranks/1.svg"),
    RANK2: require("assets/ranks/2.svg"),
    RANK3: require("assets/ranks/3.svg"),
    RANK4: require("assets/ranks/4.svg"),
    RANK5: require("assets/ranks/5.svg"),
    RANK6: require("assets/ranks/6.svg"),
    RANK7: require("assets/ranks/7.svg"),
    RANK8: require("assets/ranks/8.svg"),
    RANK9: require("assets/ranks/9.svg"),
    RANK10: require("assets/ranks/10.svg"),
    RANK11: require("assets/ranks/11.svg"),
    RANK12: require("assets/ranks/12.svg"),
    RANK13: require("assets/ranks/13.svg"),
    RANK14: require("assets/ranks/14.svg"),
    RANK15: require("assets/ranks/15.svg"),
    RANK16: require("assets/ranks/16.svg"),
    RANK17: require("assets/ranks/17.svg"),
    RANK18: require("assets/ranks/18.svg"),
    RANK19: require("assets/ranks/19.svg"),
    RANK20: require("assets/ranks/20.svg"),
};