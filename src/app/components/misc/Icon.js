import * as m from "mithril";

import LOGO from "assets/r6db_logo_new.svg";
import TWITTER from "assets/twitter.svg";
import EMAIL from "assets/email.svg";
import NOAVATAR from "assets/noavatar.svg";
import RANK0 from "assets/ranks/0.svg";
import RANK1 from "assets/ranks/1.svg";
import RANK2 from "assets/ranks/2.svg";
import RANK3 from "assets/ranks/3.svg";
import RANK4 from "assets/ranks/4.svg";
import RANK5 from "assets/ranks/5.svg";
import RANK6 from "assets/ranks/6.svg";
import RANK7 from "assets/ranks/7.svg";
import RANK8 from "assets/ranks/8.svg";
import RANK9 from "assets/ranks/9.svg";
import RANK10 from "assets/ranks/10.svg";
import RANK11 from "assets/ranks/11.svg";
import RANK12 from "assets/ranks/12.svg";
import RANK13 from "assets/ranks/13.svg";
import RANK14 from "assets/ranks/14.svg";
import RANK15 from "assets/ranks/15.svg";
import RANK16 from "assets/ranks/16.svg";
import RANK17 from "assets/ranks/17.svg";
import RANK18 from "assets/ranks/18.svg";
import RANK19 from "assets/ranks/19.svg";
import RANK20 from "assets/ranks/20.svg";

export default {
    view({ attrs }) {
        return m("svg.icon", {
            viewBox: attrs.glyph.viewBox,
            preserveAspectRatio: attrs.preserveAspectRatio,
            class: attrs.className,
            fill: attrs.fill,
            stroke: attrs.stroke
        }, [
            m(`use[xlink:href=${attrs.glyph}]`)
        ]);
    }
};

export const GLYPHS = {
    LOGO,
    TWITTER,
    EMAIL,
    NOAVATAR,
    RANK0,
    RANK1,
    RANK2,
    RANK3,
    RANK4,
    RANK5,
    RANK6,
    RANK7,
    RANK8,
    RANK9,
    RANK10,
    RANK11,
    RANK12,
    RANK13,
    RANK14,
    RANK15,
    RANK16,
    RANK17,
    RANK18,
    RANK19,
    RANK20,
};