import * as React from "react";
import { toPlayer } from "lib/store/actions";
import Link from "redux-first-router-link";

export default function PlayerLabel(props) {
    return (
        <div className="comparison__player playerlabel">
            <Link to={toPlayer(props.id)}>{props.name}</Link>
            <Link to={props.removeAction} className="playerlabel__remove">
                ✖
            </Link>
        </div>
    );
}
