import * as m from "mithril";
import { redirect } from "redux-first-router";
import { connect } from "lib/store/connect";
import "./searchbar.scss";

const Searchbar = {
    oninit({ attrs, state }) {
        state.query = attrs.search;
        state.platform = attrs.platform || "PC";
        state.onEnter = e => {
            if (e.keyCode === 13) {
                state.onSearch();
            }
        };
        state.onSearch = function (e) {
            e.preventDefault();
            console.log(state);
            const q = state.query;
            if (q.length > 2) {
                attrs.goSearch(q, state.platform);
            } else {
                attrs.goHome();
            }
        };
        state.onQueryChange = e => { state.query =  e.target.value; };
        state.onPlatformChange = e => { state.platform =  e.target.value; };
    },
    view({ state }) {
        return (
            <form className="search-form" action="" onsubmit={state.onSearch}>
                <div className="search-input">
                    <input type="text"
                        value={state.query}
                        placeholder="Who are you looking for?"
                        oninput={state.onQueryChange}
                        onkeypress={state.onEnter} />
                    <select value={state.platform} onchange={state.onPlatformChange}>
                        <option value="PC">PC</option>
                        <option value="PS4">PS4</option>
                        <option value="XBOX">XBOX</option>
                    </select>
                </div>
                <button className="button is-primary search-submit">Search</button>
            </form>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    goSearch: (name, platform) => dispatch({ type: "SEARCH", payload: { query: name, platform} }),
    goHome: () => dispatch({ type: "HOME" })
})
export default connect(null, mapDispatchToProps)(Searchbar);