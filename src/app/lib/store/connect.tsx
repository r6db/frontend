import * as m from "mithril";
import * as redux from "redux";

let getState: () => any;
let dispatch: redux.Dispatch<any>;

interface IProviderAttrs{
    store: redux.Store<any>
}
interface IProviderState{
    loaded: boolean;
}    

interface IMapState<S,R>{
    (getState: () => S): R
}
interface IMapDispatch<S,R>{
    (dispatch: redux.Dispatch<any>, getState: () => S): R
}

export const Provider: m.ComponentTypes<IProviderAttrs, IProviderState> = {
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



export const connect = function<S,D, T>(mapStateToProps?: IMapState<T,S>, mapDispatchToProps?: IMapDispatch<T,D>) {
    return function<PA>(Component: m.Component<S&D&PA, any>): m.ComponentTypes<PA> {
        return {
            view({ attrs, children }) {
                const mapState = mapStateToProps || ((state: any) => ({}));
                const mapDispatch = mapDispatchToProps || ((dispatch: any, state: any) => ({}));
                const mappedProps = (Object.assign({}, attrs, mapState(getState), mapDispatch(dispatch, getState)) as S & D & PA);
                const C = Component as any;
                return <C {...mappedProps }>{children}</C>
            }
        };
    }
}