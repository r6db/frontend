import * as m from "mithril";
import Page from "components/misc/Page";

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
                    throw err;
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
        return state.Component ? (
            <state.Component {...attrs} />
        ) : (
            <Page>
                <Page.Head />
                <Page.Content />
            </Page>
        );
    },
};

export default AsyncComponent;
