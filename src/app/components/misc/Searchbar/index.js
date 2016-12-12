import m from "mithril";
import "./searchbar.scss";
import page from "page";
import Log from "lib/log";
const log = Log.child(__filename);

export default {
    oninit({ attrs, state }) {
        state.onEnter = state.onEnter = e => {
            if (e.keyCode === 13) {
                state.onSearch();
            }
        };
        state.onSearch = function () {

            const q = state.query.get();
            const e = state.exact.get();
            if (q.length > 2) {
                page(`/search/${q}${e ? "?exact=true" : ""}`);
            } else {
                page("/");
            }
        };
        log.trace("<Searchbar /> oninit", attrs.search);
        state.query = attrs.selector.select("query");
        state.exact = attrs.selector.select("exact");
    },
    view({ state }) {
        return (
            <div className="search-form">
                <div className="column is-small-8 search-input">
                    <input type="text"
                        value={state.query.get()}
                        oninput={q => state.query.set(q.target.value)}
                        onkeypress={state.onEnter} />
                    <span>
                        <input type="checkbox"
                            id="exactSearch"
                            checked={state.exact.get()}
                            onchange={e => state.exact.set(e.target.checked)} />
                        <label htmlFor="exactSearch">exact name</label>
                    </span>
                </div>
                <button className="search-submit" onclick={state.onSearch}>Search</button>
            </div>
        );
    }
};
