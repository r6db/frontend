import * as m from "mithril";
import { redirect } from "redux-first-router";
import { connect } from "lib/store/connect";
import "./searchbar.scss";

const Searchbar = {
    oninit({ attrs, state }) {
        state.query = attrs.search || "";
        state.onEnter = e => {
            if (e.keyCode === 13) {
                state.onSearch();
            }
        };
        state.onSearch = function (e) {
            if (e && "preventDefault" in e) {
                e.preventDefault();
            }
            const q = state.query;
            if (q.length > 2) {
                attrs.goSearch(q);
            } else {
                attrs.goHome();
            }
        };
        state.onQueryChange = e => { state.query =  e.target.value; };
    },
    view({ attrs, state }) {
        return (
            <form className="search-form" action="" onsubmit={state.onSearch}>
                <div className="search-input">
                    <input type="text"
                        value={state.query}
                        placeholder="player name"
                        oninput={state.onQueryChange}
                        onkeypress={state.onEnter} />
                    <select value={attrs.platform} onchange={m.withAttr("value", attrs.setPlatform)}>
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

const mapStateToProps = getState => ({ platform: getState().platform });
const mapDispatchToProps = (dispatch, getState) => ({
    goSearch: name => {
        const { platform } = getState();
        dispatch({ type: "SEARCH", payload: { query: name, platform } })
    },
    goHome: () => dispatch({ type: "HOME" }),
    setPlatform: pl => dispatch({ type: "PLATFORM", payload: pl })
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);