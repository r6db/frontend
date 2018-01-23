import * as Inferno from "inferno";
import { toPlayer } from "lib/store/actions";
import Link from "components/misc/Link";

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
