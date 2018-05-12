import * as React from "react";
import { connect } from "react-redux";
import Icon, { GLYPHS } from "../Icon";
import Searchbar from "../Searchbar";
import Link from "redux-first-router-link";
import "./menu.scss";

const Menu = props => (
    <div className="menu">
        <Link to="/" className="menu__logo">
            <Icon glyph={GLYPHS.LOGO} />
        </Link>

        <div className="menu__divider" />

        <div className="menu__section menu__links menu__section--primary">
            <Link to="/" className="menu__item">
                <Icon className="menu__icon" glyph={GLYPHS.HOME} />
                Home
            </Link>
            <Link to={`/leaderboard/${props.platform}/ALL`} className="menu__item">
                <Icon className="menu__icon" glyph={GLYPHS.LIST} />
                Leaderboard
            </Link>

            <Link to={`/favorites`} className="menu__item">
                <Icon className="menu__icon" glyph={GLYPHS.STAR} />
                Favorites
            </Link>

            <Link to={`/compare`} className="menu__item">
                <Icon className="menu__icon" glyph={GLYPHS.USERS} />
                Compare (beta)
            </Link>
        </div>

        <div className="menu__divider" />

        <div className="menu__section menu__links menu__section--secondary">
            <Link to="/faq" className="menu__item">
                FAQ
            </Link>
            <a href="http://apidocs.r6db.com/" rel="noopener" target="_BLANK" className="menu__item">
                API
            </a>
            <Link to="/settings" className="menu__item">
                Settings
            </Link>
            <Link to="/privacy" className="menu__item">
                Privacy policy
            </Link>
        </div>

        <div className="menu__divider" />

        <div className="menu__section menu__sublinks">
            <a href="https://twitter.com/Rainbow6_DB" rel="noopener" target="_BLANK" className="menu__item">
                <Icon className="menu__icon" glyph={GLYPHS.TWITTER} />
            </a>
            <a href="mailto:info@r6db.com" rel="noopener" target="_BLANK" className="menu__item">
                <Icon className="menu__icon" glyph={GLYPHS.EMAIL} />
            </a>
            <a href="https://discord.gg/xyMTkXm" rel="noopener" target="_BLANK" className="menu__item">
                <Icon className="menu__icon" glyph={GLYPHS.DISCORD} />
            </a>
            <a href="https://github.com/r6db" rel="noopener" target="_BLANK" className="menu__item">
                <Icon className="menu__icon" glyph={GLYPHS.GITHUB} />
            </a>
        </div>

        <div className="menu__divider" />

        <div className="menu__copyright">This site is not affiliated with Ubisoft Entertainment.</div>
    </div>
);

const mapStateToProps = state => ({ platform: state.platform });
export default connect(mapStateToProps)(Menu);
