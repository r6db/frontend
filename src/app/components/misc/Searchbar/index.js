import * as m from "mithril";
import { redirect } from "redux-first-router";
import { connect } from "lib/store/connect";
import "./searchbar.scss";

const Searchbar = {
    oninit({ attrs, state }) {
        state.query = attrs.search;
        state.onEnter = e => {
            if (e.keyCode === 13) {
                state.onSearch();
            }
        };
        state.onSearch = function () {

            const q = state.query;
            if (q.length > 2) {
                attrs.goSearch(q);
            } else {
                attrs.goHome();
            }
        };
        state.onQueryChange = e => {
            state.query =  e.target.value;
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

const mapDispatchToProps = (dispatch) => ({
    goSearch: (name) => dispatch(redirect({ type: "SEARCH", payload: { query: name } })),
    goHome: () => dispatch(redirect({ type: "HOME" }))
})
export default connect(null, mapDispatchToProps)(Searchbar);