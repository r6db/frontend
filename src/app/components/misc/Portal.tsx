import * as React from "react";
import * as ReactDOM from "react-dom";

const getRoot = () => document.getElementById("portal");

export default function Portal(props) {
    return ReactDOM.createPortal(props.children, getRoot());
}
