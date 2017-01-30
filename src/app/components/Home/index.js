import m from "mithril";
import "./home.scss";
import Searchbar from "../misc/Searchbar";

export default {
    oncreate({dom}) {
        dom.querySelector("input").focus();
    },
    view({ attrs, state }) {
        return (
            <div className="search">
                <div className="search-input">
                    <Searchbar search={attrs.search} selector={attrs.store.select("search")} />
                </div>
            </div>
        );
    }
};
