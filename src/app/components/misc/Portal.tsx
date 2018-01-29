import * as React from "react";
import * as ReactDOM from "react-dom";

const getRoot = () => {
    const mount = document.getElementById("portal")
    if (mount) {
        return mount;
    } else {
        const m = document.createElement("div");
        m.id = "portal";
        document.body.appendChild(m);
        return m;
    }
};

export default function Portal(props) {
    return ReactDOM.createPortal(props.children, getRoot());
}
