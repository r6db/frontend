import m from "mithril";
import store from "lib/store";
import "./loading.scss";

export default {
    oninit({ state }) {
        state.msg = null;
        state.msg = store.get("loading");
        state.onUpdate = function () {
            state.msg = store.get("loading");
            m.redraw();
        };
        store.select("loading").on("update", state.onUpdate);
    },
    onbeforeremove({ dom, state }, done) {
        dom.classList.add("is-leaving");
        store.select("loading").off(state.onUpdate);
        setTimeout(done, 60);
    },
    view({ state }) {
        return (
            <div className="loading">
                <div className="loading-indicator"></div>
                <div className="loading-message">{state.msg}</div>
            </div>
        );
    }
};
