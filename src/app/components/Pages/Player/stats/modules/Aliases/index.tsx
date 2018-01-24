import * as React from "react";
import Alias from "./Alias";
import "./aliases.scss";

export default function Aliases(props) {
    return (
        <div className="playermodule aliases">
            <div className="playermodule__header">Alias History</div>
            <div className="aliases__list">
                {props.aliases.map(x => <Alias key={x.name + x.created_at} alias={x} />)}
            </div>
        </div>
    );
}
