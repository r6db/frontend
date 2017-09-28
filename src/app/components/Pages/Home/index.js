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
                    1 year anniversary hype! <br />
                    <a href="https://medium.com/@r6db/one-year-anniversary-e7083181370d">blog post</a>
                </div>
            </div>
        );
    }
};
