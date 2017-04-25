import m from "mithril";
import "./home.scss";
import Searchbar from "../misc/Searchbar";
import Log from "lib/log";
const log = Log.child(__filename);

const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;


const showPlayer = id => e => page("/player/" + id);

export default {
    view({ attrs, state }) {
        return (
            <div className="search">
                <h1 className="search-title">
                    <img src="/assets/r6db_logo_new.svg" alt="R6DB Logo"/>
                </h1>
                <Searchbar
                    className="menu-search"    
                    search={attrs.search}
                    selector={attrs.store.select("search")} />
            </div>
        );
    }
};
