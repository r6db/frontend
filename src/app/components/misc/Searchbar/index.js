import m from "mithril";
import "./searchbar.scss";
import page from "page";

export default {
    oninit({ attrs, state }) {
        state.query = "";
        state.exact = false;
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
        console.debug("<Searchbar /> oninit", attrs.search);
        state.onQueryChange = e => {
            state.query =  e.target.value;
        };
        state.onExactChange = e => {
            state.exact =  e.target.checked;
        };
    },
    view({ state }) {
        return (
            <div className="search-form">
                <div className="search-input">
                    <input type="text"
                        value={state.query}
                        placeholder="Who are you looking for?"
                        oninput={state.onQueryChange}
                        onkeypress={state.onEnter} />
                </div>
                <button className="search-submit" onclick={state.onSearch}>Search</button>
            </div>
        );
    }
};
