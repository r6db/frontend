import * as m from "mithril";
import Link from "components/misc/Link";
import Icon, { GLYPHS } from "components/misc/Icon";
import "./footer.scss";

const Footer: m.Component<{}, {}> = {
    view() {
        return m(".footer", [
            m(".footer__container.container", [
                m(".footer__column", [
                    m(Link, { className: "footer__link footer__link--noicon", to: "/" }, "Home"),
                    m(Link, { className: "footer__link footer__link--noicon", to: "/leaderboard" }, "Leaderboard"),
                    m(Link, { className: "footer__link footer__link--noicon", to: "/compare" }, "Compare"),
                    m(Link, { className: "footer__link footer__link--noicon", to: "/faq" }, "FAQ"),
                ]),
                m(".footer__column", [
                    m("header.footer__header", ""),
                    m(
                        "a",
                        {
                            target: "_BLANK",
                            rel: "noopener",
                            className: "footer__link",
                            href: "https://twitter.com/Rainbow6_DB",
                        },
                        [m(Icon, { className: "footer__icon", glyph: GLYPHS.TWITTER }), "Twitter"],
                    ),
                    m(
                        "a",
                        { target: "_BLANK", rel: "noopener", className: "footer__link", href: "mailto:info@r6db.com" },
                        [m(Icon, { className: "footer__icon", glyph: GLYPHS.EMAIL }), "Email"],
                    ),
                    m(
                        "a",
                        {
                            target: "_BLANK",
                            rel: "noopener",
                            className: "footer__link",
                            href: "https://discord.gg/xyMTkXm",
                        },
                        [m(Icon, { className: "footer__icon", glyph: GLYPHS.DISCORD }), "Discord"],
                    ),
                    m(
                        "a",
                        {
                            target: "_BLANK",
                            rel: "noopener",
                            className: "footer__link",
                            href: "https://github.com/r6db",
                        },
                        [m(Icon, { className: "footer__icon", glyph: GLYPHS.GITHUB }), "Github"],
                    ),
                ]),
                m(".footer__column", [
                    m("header.footer__header", ""),
                    // m(Link, { className: "footer__link footer__link--noicon", to: "/"}, "Privacy"),
                    // m(Link, { className: "footer__link footer__link--noicon", to: "/"}, "Thank you"),
                    m(
                        "a",
                        { className: "footer__link footer__link--noicon", href: "https://github.com/r6db/r6db/issues" },
                        "Report bug",
                    ),
                ]),
            ]),
        ]);
    },
};

export default Footer;
