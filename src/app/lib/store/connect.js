import * as m from "mithril";

let getState;
let dispatch;

export const Provider = {
    oninit({ attrs, state }) {
        getState = attrs.store.getState;
        dispatch = attrs.store.dispatch;
        state.loaded = false;
    },
    oncreate({ state }) {
        state.loaded = true;
        m.redraw();
    },
    view({ children, state }) {
        return state.loaded ? children : null;
    }
}

export const connect = (mapStateToProps, mapDispatchToProps) => Component => ({
    view({ attrs, children }) {
        const mapState = mapStateToProps || (() => ({}));
        const mapDispatch = mapDispatchToProps || (() => ({}));
        const mappedProps = Object.assign({}, attrs, mapState(getState, attrs), mapDispatch(dispatch, attrs));
        return <Component {...mappedProps}>{children}</Component>
    }
})