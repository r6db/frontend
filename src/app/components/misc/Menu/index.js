import m from "mithril";
import "./menu.scss";
import Icon, { GLYPHS } from "../Icon";
import page from "page";

const link = href => e => page(href);

export default {
    view({ attrs, children }) {

        return (
            <div className="menu">
                <a href="/" className="menu-top">
                    <Icon class="menu-logo" glyph={GLYPHS.LOGO} fill="white" />
                </a>
                <div className="menu-center">
                    <a href="/search" className="menu-item">Search</a>
                    <a href="/leaderboard" className="menu-item">Leaderboard</a>
                </div>
                <footer className="menu-bottom is-center">
                    <p className="search-siteinfo">
                        Updates now at <a href="https://twitter.com/Rainbow6_DB">Twitter</a>
                    </p>
                    <a href="mailto:info@r6db.com">info@r6db.com</a>
                </footer>
            </div>
        );
    }
};