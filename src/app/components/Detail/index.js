import m from "mithril";
import Player from "./Player";
import Placeholder from "./Placeholder";
import NotFound from "./NotFound";
import "./detail.scss";
import Log from "lib/log";
const log = Log.child(__filename);

const either = (pred, a, b) => pred ? a() : b();

export default {
    onremove({ state }) {
        log.trace("<Detail /> onremove");
    },
    oninit({ attrs, state }) {
        log.trace("<Detail /> oninit");
    },
    view({ attrs, state }) {
        const Component = attrs.loading
            ? <Placeholder />
            : attrs.data
                ? <Player {...attrs.data} />
                : <NotFound />;
        return Component;
    }
};
 