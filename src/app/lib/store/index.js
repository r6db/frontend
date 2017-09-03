import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { connectRoutes } from "redux-first-router";
import thunkMiddleware from "redux-thunk";
import * as persistState from "redux-localstorage";

import routesMap from "./routesMap";
import * as reducers from "./reducers";

const createLogger = ({ getState }) => next => action => {
    const console = window.console;
    const prevState = getState();
    const returnValue = next(action);
    const nextState = getState();
    const actionType = String(action.type);
    const message = `action ${actionType}`;
    console.groupCollapsed(message);
    console.info(`old state, %o`, prevState);
    console.info(`action`, action);
    console.info(`new state, %o`, nextState);
    console.groupEnd(message);
    return returnValue;
  };


export default (history, preLoadedState) => {
    const { reducer, middleware, enhancer, thunk } = connectRoutes(
        history,
        routesMap
    );

    const rootReducer = combineReducers({ ...reducers, location: reducer });
    const middlewares = applyMiddleware(
        thunkMiddleware,
        createLogger,
        middleware,
    );
    const enhancers = compose(
        enhancer,
        persistState(["platform"]),
        middlewares
    );

    const store = createStore(rootReducer, preLoadedState, enhancers);

    if (module.hot && process.env.NODE_ENV === "development") {
        module.hot.accept("./reducers/index", () => {
            const reducers = require("./reducers/index");
            const rootReducer = combineReducers({ ...reducers, location: reducer });
            store.replaceReducer(rootReducer);
        });
    }

    return { store, thunk };
};
