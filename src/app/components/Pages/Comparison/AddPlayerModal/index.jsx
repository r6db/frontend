import * as m from "mithril";
import Modal from "components/misc/Modal";
import Profilepic from "components/misc/Profilepic";
import { findPlayer } from "lib/api";
import { formatDuration } from "lib/stats";
import "./addplayermodal.scss";

const AddPlayerModal = {
    oninit(vnode) {
        const { state } = vnode;
        state.query = "";
        state.platform = "PC";
        state.results = [];
        state.onSearch = function(e) {
            if (e && "preventDefault" in e) {
                e.preventDefault();
            }
            const q = state.query;
            if (q.length > 2) {
                findPlayer(state.query, state.platform)
                    .then(res => {
                        state.results = res;
                        m.redraw();
                    })
                    .catch(err => {
                        console.error(err);
                        state.results = [];
                        m.redraw();
                    });
            }
        };
        state.onPlatformChange = e => {
            state.platform = e.target.value;
        };
        state.onQueryChange = e => {
            state.query = e.target.value;
        };
    },
    view({ attrs, state }) {
        return (
            <Modal className="addplayermodal" title="Add player" onclose={attrs.onclose}>
                <form className="searchbar addplayermodal__search" action="" onsubmit={state.onSearch}>
                    <input
                        className="searchbar__name"
                        type="text"
                        value={state.query}
                        placeholder="enter player name"
                        onkeypress={state.onQueryChange}
                        onchange={state.onQueryChange}
                    />
                    <select
                        className="searchbar__platform"
                        value={attrs.platform}
                        onchange={m.withAttr("value", state.onPlatformChange)}
                    >
                        <option value="PC">PC</option>
                        <option value="PS4">PS4</option>
                        <option value="XBOX">XB1</option>
                    </select>
                    <button onsubmit={state.onSearch} className="button button--primary searchbar__submit">Search</button>
                </form>
                <div className="addplayermodal__results">
                    {state.results.map(x => (
                        <div
                            key={x.id}
                            className={`media addplayermodal__result ${
                                attrs.ids.find(id => id === x.id) !== undefined
                                    ? "addplayermodal__result--selected"
                                    : ""
                            }`}
                            onclick={() => attrs.onselect(x.id)}
                        >
                            <div className="media__image">
                                <Profilepic id={x.userId || x.id} />
                            </div>
                            <div className="media__content">
                                <div className="media__contentheader">
                                    <header className="media__header">{x.name}</header>
                                    {x.flair ? <span className="media__label">{x.flair}</span> : null}
                                </div>
                                <div className="media__text">
                                    <div>level {x.level}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        );
    },
};

export default AddPlayerModal;
