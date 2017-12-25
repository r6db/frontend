import * as m from "mithril";

const AsyncComponent = {
    oninit({ attrs, state }) {
        state.importFn = null;
        state.Component = null;

        state.load = function(importFn) {
            if (importFn == state.importFn) {
                return null;
            }
            state.importFn = importFn;
            importFn()
                .then(module => {
                    state.Component = module.default;
                    console.log(`loaded ${importFn.name}`);
                    m.redraw();
                })
                .catch(err => {
                    console.error(`couldn't import component ${importFn.name}`, err);
                    state.Component = null;
                    m.redraw();
                });
        };

        state.load(attrs.importFn);
    },
    onupdate({ attrs, state }) {
        state.load(attrs.importFn);
    },

    view({ attrs, state }) {
        return state.Component ? <state.Component {...attrs} /> : <div />;
    },
};

export default AsyncComponent;
