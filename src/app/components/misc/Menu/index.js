import m from "mithril";
import "./menu.scss";
import Icon, { GLYPHS } from "../Icon";
import Searchbar from "../Searchbar";
import Tweet from "./Tweet";
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
                    <div className="menu-tweets">{
                        attrs.store.get("tweets")
                            .map(tweet => <Tweet {...tweet} />)
                    }</div>    
                    <div className="menu-footer">
                        <a href="https://twitter.com/Rainbow6_DB">
                            <Icon glyph={GLYPHS.TWITTER} />
                        </a>
                        <a href="mailto:info@r6db.com">info@r6db.com</a>
                    </div>
                </footer>
            </div>
        );
    }
};