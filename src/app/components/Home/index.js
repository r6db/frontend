import m from "mithril";
import page from "page";
import api from "lib/api";
import store from "lib/store";
import { title, State } from "lib/constants";
import Searchbar from "../misc/Searchbar";
import Log from "lib/log";
const log = Log.child(__filename);

const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;


const showPlayer = id => e => page("/player/" + id);

export default {
    oncreate({dom}) {
        dom.querySelector(".search-input input").focus();
    },
    view({ attrs, state }) {
        return (
            <div className="search">
                <h1 className="title is-1 search-title">R6DB</h1>
                <Searchbar search={attrs.search} />
                <footer className="search-footer is-center">
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
