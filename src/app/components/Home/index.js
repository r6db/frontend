import m from "mithril";
import "./home.scss";
import { isPS4, isXbox, isPC } from "lib/constants";
import Log from "lib/log";
const log = Log.child(__filename);

const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;


const showPlayer = id => e => page("/player/" + id);

export default {
    view({ attrs, state }) {
        return (
            <div className="search">
                <h1 className="search-title">
                    <img src="/assets/r6db_logo.svg" alt="R6DB Logo"/>
                </h1>
                <footer className="search-footer is-center">
                    <div className="search-platforms">
                        {isPC ? <span>PC</span> : <a href="https://r6db.com" className="">PC</a>}
                        {isPS4 ? <span>PS$</span> : <a href="https://ps4.r6db.com" className="">PS4</a>}
                        {isXbox ? <span>XBOX</span> : <a href="https://xbox.r6db.com" className="">XBOX</a>}
                    </div>    
                    <p className="search-siteinfo">
                        Updates now at <a href="https://twitter.com/Rainbow6_DB">Twitter</a>
                    </p>
                    {attrs.data ? (
                        <div class="footer-stats">
                            <span>{attrs.data.usercount}</span> accounts and <span>{attrs.data.namecount}</span> aliases indexed
                        </div>) : null}
                    <a href="mailto:info@r6db.com">info@r6db.com</a>
                </footer>
            </div>
        );
    }
};
