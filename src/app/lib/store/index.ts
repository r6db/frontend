import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { connectRoutes } from "redux-first-router";
import thunkMiddleware from "redux-thunk";
import * as persistState from "redux-localstorage";
import * as queryString from "querystring";

import routesMap from "./routesMap";
import * as reducers from "./reducers";

export default history => {
    const { reducer, middleware, enhancer, thunk } = connectRoutes(history, routesMap, {
        querySerializer: queryString,
    });

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const rootReducer = combineReducers(Object.assign({}, reducers, { location: reducer }));
    const middlewares = applyMiddleware(thunkMiddleware, middleware);
    const enhancers = composeEnhancers(enhancer, persistState(["platform","favorites"]), middlewares);

    const store = createStore(rootReducer, undefined, enhancers);

    if (module.hot && process.env.NODE_ENV === "development") {
        module.hot.accept(() => {
            const rootReducer = combineReducers(Object.assign({}, reducers, { location: reducer }));
            store.replaceReducer(rootReducer);
        });
    }
    return store;
};
