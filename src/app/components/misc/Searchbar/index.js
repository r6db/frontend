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

            const q = state.query;
            const e = state.exact;
            if (q.length > 2) {
                page(`/search/${q}${e ? "?exact=true" : ""}`);
            } else {
                page("/");
            }
        };
        log.trace("<Searchbar /> oninit", attrs.search);
        state.query = attrs.selector.get("query");
        state.exact = attrs.selector.get("exact");
        state.onQueryChange = e => {
            state.query =  e.target.value;
        };
        state.onExactChange = e => {
            state.exact =  e.target.checked;
        };
    },
    view({ attrs, state }) {
        return (
            <div className={"search-form " + attrs.className}>
                <div className="search-input">
                    <input type="text"
                        value={state.query}
                        placeholder="player name"
                        oninput={state.onQueryChange}
                        onkeypress={state.onEnter} />
                    <span>
                        <input type="checkbox"
                            id="exactSearch"
                            checked={state.exact}
                            onchange={state.onExactChange} />
                        <label htmlFor="exactSearch">exact name</label>
                    </span>
                </div>
                <button className="search-submit" onclick={state.onSearch}>Search</button>
            </div>
        );
    }
};
