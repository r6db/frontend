import * as React from "react";
import "./stat.scss";

export default function(props) {
    return (
        <div className="stat">
            <div className="stat__value">{props.children}</div>
            <div className="stat__label">{props.label}</div>
        </div>
    );
}
