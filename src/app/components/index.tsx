import * as React from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import Layout from "./Layout";

let store = null;

function RootComponent(props) {
    if (!store) {
        store = props.store;
    }
    return (
        <Provider store={store}>
            <Layout />
        </Provider>
    );
}

export default hot(module)(RootComponent);
