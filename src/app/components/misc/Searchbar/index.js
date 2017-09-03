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
            e.preventDefault();
            console.log(state);
            const q = state.query;
            if (q.length > 2) {
                attrs.goSearch(q, attrs.platform);
            } else {
                attrs.goHome();
            }
        };
        state.onQueryChange = e => { state.query =  e.target.value; };
    },
    onbeforeupdate(vnode, old) {
        if (vnode.attrs.platform !== old.attrs.platform) {
            vnode.state.platform = vnode.attrs.platform;
        }
    },
    view({ attrs, state }) {
        return (
            <form className="search-form" action="" onsubmit={state.onSearch}>
                <div className="search-input">
                    <input type="text"
                        value={state.query}
                        placeholder="Who are you looking for?"
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
const mapDispatchToProps = (dispatch) => ({
    goSearch: (name, platform) => dispatch({ type: "SEARCH", payload: { query: name, platform } }),
    goHome: () => dispatch({ type: "HOME" }),
    setPlatform: pl => dispatch({ type: "PLATFORM", payload: pl })
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);