import * as m from "mithril";

const AsyncComponent = {
    oninit({ attrs, state }) {
        state.importFn = null;
        state.Component = null;
        state.loading = true;
    },
    onupdate({ attrs, state }) {
        if (attrs.importFn == state.importFn) {
            return null;
        }
        if (attrs.importFn) {
            state.importFn = attrs.importFn;
            attrs
                .importFn()
                .then(module => {
                    state.Component = module.default;
                    state.loading = false;
                    m.redraw();
                })
                .catch(err => {
                    console.error(`couldn't import component ${attrs.importFn.name}`, err);
                    state.loading = false;
                    state.Component = "div";
                    m.redraw();
                });
        }
    },

    view({ attrs, state }) {
        return state.Component ? <state.Component {...attrs} /> : null;
    },
};

export default AsyncComponent;
