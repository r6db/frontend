import m from "mithril";
import "./home.scss";
import Searchbar from "../misc/Searchbar";
import Log from "lib/log";
const log = Log.child(__filename);

const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;


const showPlayer = id => e => page("/player/" + id);

export default {
    oncreate({ dom }) { 
        const search = dom.querySelector(".search-input input");
        if (search && !window.ontouchstart) {
            search.focus();
        }
    },
    view({ attrs, state }) {
        return (
            <div className="home">
                <Searchbar
                    className="menu-search"    
                    search={attrs.search}
                    selector={attrs.store.select("search")} />
            </div>
        );
    }
};
