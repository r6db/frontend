import * as React from "react";
import { connect } from "react-redux";
import Link from "redux-first-router-link";
import Icon, { GLYPHS } from "components/misc/Icon";
import "./footer.scss";

const Footer = props => (
    <div className="footer">
        <div className="footer__container container">
            <div className="footer__section footer__notice">
                <span className="footer__copyright">
                    This site is not affiliated with Ubisoft Entertainment.
                </span>
            </div>
            <div className="footer__section">
                <a href="https://twitter.com/Rainbow6_DB" rel="noopener" target="_BLANK" className="footer__link">
                    <Icon className="footer__icon" glyph={GLYPHS.TWITTER} />
                    Twitter
                </a>
                <a href="mailto:info@r6db.com" rel="noopener" target="_BLANK" className="footer__link">
                    <Icon className="footer__icon" glyph={GLYPHS.EMAIL} />
                    Email
                </a>
                <a href="https://discord.gg/xyMTkXm" rel="noopener" target="_BLANK" className="footer__link">
                    <Icon className="footer__icon" glyph={GLYPHS.DISCORD} />
                    Discord
                </a>
                <a href="https://github.com/r6db" rel="noopener" target="_BLANK" className="footer__link">
                    <Icon className="footer__icon" glyph={GLYPHS.GITHUB} />
                    Github
                </a>
            </div>
        </div>
    </div>
);

const mapState = state => ({ platform: state.platform });
export default connect(mapState)(Footer);
