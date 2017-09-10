import * as m from "mithril";
import debounce from "lib/debounce";
import { connect } from "lib/store/connect";

const listener = function (e) {
    console.debug("window resized. triggering ElementQuery");
    listeners.forEach(f => f(e));
    m.redraw();
};
window.addEventListener("resize", listener);
let listeners = [];



const Elementquery = {
    oninit({ attrs, state }) {
        state.mediaClass = "";

        if (!attrs.query) {
            console.error("Please pass an object with string keys (class) and integer values (breakpoint)");
            throw new Error("ElementQuery attr: 'query' not given");
        }
     },
    oncreate({ attrs, state, dom }) {

        state.onResize = function () {
            const width = dom.clientWidth;
            if (width < 1304) { attrs.closeMenu(); }

            state.mediaClass = Object.keys(attrs.query)
                .reduce((acc, curr) => {
                    return (width > attrs.query[curr])
                        ? acc + " " + curr
                        : acc;
                }, "");
        }
        state.onResize();
        listeners.push(state.onResize);
    },
    onremove({ state }) {
        listeners = listeners.filter(x => x !== state.onResize);
     },
    view({ attrs, state, children }) {
        return (
            <div className={`elementquery${state.mediaClass} ${attrs.className || ""}`}>
                {children}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    closeMenu: () => dispatch({ type: "MENU_CLOSE" })
})

export default connect(false, mapDispatchToProps)(Elementquery);