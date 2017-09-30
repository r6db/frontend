import * as m from "mithril";
import Searchbar from "components/misc/Searchbar";
import "./home.scss";

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
                    search={attrs.search} />
                <div className="home-disclaimer">
                    Server's down! We're working on it.
                </div>
            </div>
        );
    }
};
