import m from "mithril";
import "./menu.scss";
import Icon, { GLYPHS } from "../Icon";
import Searchbar from "../Searchbar";
import page from "page";

const link = href => e => page(href);

export default {
    view({ attrs, children }) {

        return (
            <div className="menu">
                <div className="menu-top">
                    <Icon class="menu-logo" glyph={GLYPHS.LOGO} fill="white" />
                </div>
                <Searchbar
                    className="menu-search"    
                    search={attrs.search}
                    selector={attrs.store.select("search")} />
                <div className="menu-center">
                    <a href="/" className="menu-item">Home</a>
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