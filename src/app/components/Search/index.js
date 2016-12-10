import m from "mithril";
import page from "page";
import debounce from "lodash/debounce";
import Result from "./Result";
import Searchbar from "../misc/Searchbar";
import api from "lib/api";
import store from "lib/store";
import { title, State } from "lib/constants";
import exitAnim from "lib/exitAnim";
import Log from "lib/log";
const log = Log.child(__filename);

const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;


const showPlayer = id => `/player/${id}`;

const search = store.select("search");


module.exports = {
    results: m.prop([]),			// the search results
    onbeforeremove: exitAnim,
    oninit: ({ attrs, state }) => {
        log.trace("<Search /> oninit");
        /**
         * simple keylistener to trigger the search on enter keypress
         */
        state.runSearch = debounce(function () {
            state.results([]);
            
            if(search.get("query").length < 3) { 
                log.trace("not running search because query is too short");
                return;
            }
            log.trace("running search");
            return api("findPlayer", { name: search.get("query"), exact: search.get("exact") })
                .then(state.results)
                .then(() => {
                    if (store.get("appstate") === State.SEARCH) {
                        store.set("appstate", State.RESULT);
                    } else {
                        log.warn("not in search state", store.get("appstate"));
                        return Promise.reject("not in search state");
                    }
                })
                .then(() => log.trace("search finished"))
                .then(function () {
                    log.debug("rendering results", state.results());
                    store.set("loading", false);
                    m.redraw();
                    // this is a weird workaround.
                    // it won't trigger the animation. and stay hidden
                    // a redraw fixes that
                    if (state.results().length === 1) {
                        setTimeout(m.redraw, 30);
                    }
                })
                .catch(err => {
                    const state = store.get("appstate");
                    if (err instanceof Error) {
                        log.error(err);
                    }
                    if (state === State.SEARCH || state === State.RESULT) {
                        store.set("loading", false);
                    }
                });
        }, 500);

        state.runSearch();
        search.on("update", state.runSearch);
    },
    onremove: ({ state }) => {
        log.trace("<Search /> onremove");
        state.results([]);
        search.off("update", state.runSearch);
    },
    view: ({ attrs, state }) => (
        <div className="search">
            <h1 className="title is-1 search-title">R6DB</h1>
            <Searchbar search={attrs.store.select("search")} />
            <div className="colums is-multiline search-results">
                {
                    state.results().length > 0
                        ? state.results().map((player, i, total) =>
                            <Result player={player} index={i} key={player.id} href={showPlayer(player.id)} />)
                        : <div className="playercard is-empty">
                            we could not find any player matching that name. sorry
                    </div>
                }
            </div>
        </div>
    )
};
