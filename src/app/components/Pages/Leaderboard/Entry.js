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
                            ? <Profilepic id={attrs.userId || attrs.id} delay={0} />
                            : null
                    }
                    <div className="entry-position">
                        <span>{attrs.pos}</span>
                    </div>
                </Link>
                <div className="playercard-content">
                    <Link to={toPlayer(attrs.id)} className="playercard-left">
                        <header className="playercard-name">{attrs.name}</header>
                    </Link>
                    <div className="playercard-center">
                        <span className="entry-valuelabel">skill rating</span>
                        <span className="entry-value">
                            {attrs.value}
                        </span>
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
