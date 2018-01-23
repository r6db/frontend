import Inferno from "inferno";
import DetailError from "./DetailError";
import Icon, { GLYPHS } from "components/misc/Icon";

export default {
    view({ attrs }) {
        return (
            <DetailError title="Maintenance">

                </DetailError>
        );
        return m(DetailError, { title: "Maintenance" }, [
            m("p.paragraph", [
                "with 'maintenance' we mean that we royally fucked our server, but won't admit it.",
                m("br"),
                "if you get this site for longer than an hour or so, hit us up:",
            ]),
            m("p", [
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
                m("a", { target: "_BLANK", rel: "noopener", className: "footer__link", href: "mailto:info@r6db.com" }, [
                    m(Icon, { className: "footer__icon", glyph: GLYPHS.EMAIL }),
                    "Email",
                ]),
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
            ]),
        ]);
    },
};
