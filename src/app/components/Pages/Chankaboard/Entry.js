import * as m from "mithril";
import Profilepic from "components/misc/Profilepic";
import Link from "components/misc/Link";
import { toPlayer, toProfile } from "lib/store/actions";

export default {
    view({ attrs }) {
        return (
            <div className={`entry playercard player-${attrs.id} ${attrs.isTopEntry ? 'is-top' : ''}`}>
                <Link to={toPlayer(attrs.id)} className="playercard-image">
                    {
                        attrs.isTopEntry
                            ? <Profilepic id={attrs.userId || attrs.id} />
                            : null
                    }
                    <div className="entry-position">
                        <span className="entry-positiontext">
                            {attrs.placement}
                        </span>
                    </div>
                </Link>
                <div className="playercard-content">
                    <Link to={toPlayer(attrs.id)} className="playercard-left">
                        <header className="playercard-name">{attrs.name}</header>
                    </Link>
                    <div className="playercard-center">
                        <div className="playercard-rating">
                            <span className="entry-valuelabel">kills</span>
                            <span className="entry-value">
                                {Number.parseInt(attrs.value)}
                            </span>
                        </div>
                    </div>
                    <div className="playercard-right">
                        <Link className="playercard-link player-simple" to={toPlayer(attrs.id)}>
                            details
                            </Link>
                        <Link className="playercard-link player-extended" to={toProfile(attrs.id)}>
                            simple View
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
};