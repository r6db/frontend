import * as m from "mithril";
import { toPlayer } from "lib/store/actions";
import Link from "components/misc/Link";

export default {
    view({ attrs }) {
        return (
            <div className="comparison__player playerlabel">
                <Link to={toPlayer(attrs.id)}>{attrs.name}</Link>
                <Link to={attrs.removeAction} className="playerlabel__remove">
                    ✖
                </Link>
            </div>
        );
    },
};
