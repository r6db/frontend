import * as m from "mithril";
import Player from "./player";
import NotFound from "../Errors/NotFound";
import NoPlaytime from "../Errors/NoPlaytime";
import NoAliases from "../Errors/NoAliases";

export default {
    view({ attrs, state }) {
        if (attrs.loading) {
            return (<div className="profile"></div>)
        } else if (!attrs.data || !attrs.data.id) {
            return <NotFound />;
        } else if (attrs.data.flags && attrs.data.flags.noPlaytime) {
            return <NoPlaytime {...attrs.data} />;
        } else if (attrs.data.flags && attrs.data.flags.noAliases) {
            return <NoAliases {...attrs.data} />;
        } else {
            return <Player {...attrs.data} />;
        }
    }
};
