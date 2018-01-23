import * as Inferno from "inferno";
import DetailError from "./DetailError";
import Icon, { GLYPHS } from "components/misc/Icon";

export default function Maintenance(props) {
    return (
        <DetailError title="Maintenance">
            <p className="paragraph">
                with 'maintenance' we mean that we royally fucked our server, but won't admit it.
                <br />
                if you get this site for longer than an hour or so, hit us up:
            </p>
            <p className="paragraph">
                <a href="https://twitter.com/Rainbow6_DB" className="footer__link" rel="noopener" target="_BLANK">
                    <Icon glyph={GLYPHS.TWITTER} />
                    Twitter
                </a>
                <a href="mailto:info@r6db.com" className="footer__link" rel="noopener" target="_BLANK">
                    <Icon glyph={GLYPHS.EMAIL} />
                    Email
                </a>
                <a href="https://discord.gg/xyMTkXm" className="footer__link" rel="noopener" target="_BLANK">
                    <Icon glyph={GLYPHS.DISCORD} />
                    Discord
                </a>
            </p>
        </DetailError>
    );
}
