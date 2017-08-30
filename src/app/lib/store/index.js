import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { connectRoutes } from "redux-first-router";
import thunkMiddleware from "redux-thunk";

import routesMap from "./routesMap";
import * as reducers from "./reducers";

export default (history, preLoadedState) => {
    const { reducer, middleware, enhancer, thunk } = connectRoutes(
        history,
        routesMap
    );

    const rootReducer = combineReducers({ ...reducers, location: reducer });
    const middlewares = applyMiddleware(
        thunkMiddleware,
        middleware,
    );
    const enhancers = compose(
        enhancer,
        middlewares,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
