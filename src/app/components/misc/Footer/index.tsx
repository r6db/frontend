import * as Inferno from "inferno";
import Link from "components/misc/Link";
import Icon, { GLYPHS } from "components/misc/Icon";
import "./footer.scss";

const Footer = props => (
    <div className="footer">
        <div className="footer__container container">
            <div className="footer__column">
                <Icon className="footer__logo" glyph={GLYPHS.LOGO} />
            </div>
            <div className="footer__column">
                <Link to="/" className="footer__link footer__link--noicon">
                    Home
                </Link>
                <Link to="/leaderboard" className="footer__link footer__link--noicon">
                    Leaderboard
                </Link>
                <Link to="/compare" className="footer__link footer__link--noicon">
                    Compare
                </Link>
                <Link to="/faq" className="footer__link footer__link--noicon">
                    FAQ
                </Link>
            </div>
            <div className="footer__column">
                <a href="https://twitter.com/Rainbow6_DB" rel="noopener" target="_BLANK" className="footer__link">
                    Twitter
                </a>
                <a href="mailto:info@r6db.com" rel="noopener" target="_BLANK" className="footer__link">
                    Email
                </a>
                <a href="https://discord.gg/xyMTkXm" rel="noopener" target="_BLANK" className="footer__link">
                    Dicord
                </a>
                <a href="https://github.com/r6db" rel="noopener" target="_BLANK" className="footer__link">
                    Github
                </a>
            </div>
            <div className="footer__column">
                <a href="https://github.com/r6db/r6db/issues" className="footer__link footer__link--noicon">
                    Report Bug
                </a>
            </div>
        </div>
    </div>
);
export default Footer;
