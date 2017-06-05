import * as m from "mithril";
import debounce from "lib/debounce";

const listener = function (e) {
    console.debug("window resized. triggering ElementQuery")
    listeners.forEach(f => f(e));
    m.redraw();
};
window.addEventListener("resize", debounce(listener, 32));
let listeners = [];



export default {
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