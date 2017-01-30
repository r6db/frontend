import m from "mithril";
import Player from "./Player";
import Placeholder from "./Placeholder";
import NotFound from "./Errors/NotFound";
import NoPlaytime from "./Errors/NoPlaytime";
import NoAliases from "./Errors/NoAliases";
import "./detail.scss";
import Log from "lib/log";
const log = Log.child(__filename);

export default {
    view({ attrs, state }) {
        if (attrs.loading) {
            return <Placeholder />;
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
