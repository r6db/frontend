import m from "mithril";
import "./menu.scss";
import Icon, { GLYPHS } from "../Icon";
import Searchbar from "../Searchbar";
import page from "page";
import { isPC, isPS4, isXbox } from "lib/constants";

let platform = "PC";
if (isPS4) { platform = "PS4"; }
if (isXbox) {  platform = "XBox"; }


const link = href => e => page(href);

export default {
    view({ attrs, children }) {
        return (
            <div className="menu">
                <div className="menu-top">
                    <img src="/assets/r6db_logo_new.svg" alt="R6DB Logo"/>
                    <span className="platform">{platform}</span>
                </div>
                <div className="menu-center">
                    <a href="/" className="menu-item">Home</a>
                    <a href="/leaderboard" className="menu-item">Leaderboard</a>
                    <div className="menu-platforms">
                        {isPC ? null : <a href="https://r6db.com" className="menu-item">PC</a>}
                        {isPS4 ? null : <a href="https://ps4.r6db.com" className="menu-item">PS4</a>}
                        {isXbox ? null : <a href="https://xbox.r6db.com" className="menu-item">XBOX</a>}
                    </div>
                </div>
                <footer className="menu-bottom is-center">    
                    <div className="menu-footer">
                        <a href="https://twitter.com/Rainbow6_DB">
                            <Icon class="menu-twitter" glyph={GLYPHS.TWITTER} />
                        </a>
                        <a href="mailto:info@r6db.com">
                            <Icon class="menu-email" glyph={GLYPHS.EMAIL} />
                        </a>
                    </div>
                </footer>
            </div>
        );
    }
};