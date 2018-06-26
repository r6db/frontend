import * as React from "react";
import "./alias.scss";

const formatTitle = date => (date ? new Date(date).toLocaleString() : "no Date");

export default function Alias(props) {
    return (
        <div className="alias">
            <div className="alias__time" title={formatTitle(props.alias.created_at)}>
                {props.alias.created_at
                    ? new Date(props.alias.created_at).toLocaleDateString()
                    : "no Date"}
            </div>
            <div className="alias__name">{props.alias.name}</div>
        </div>
    );
}
