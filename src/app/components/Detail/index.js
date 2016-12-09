import m from "mithril";
import Searchbar from "../misc/Searchbar";
import Player from "./Player";

import Log from "lib/log";
const log = Log.child(__filename);

export default {
    onremove: ({ state }) => {
        log.trace("<Detail /> onremove");
    },
    oninit: ({ attrs, state }) => {
        log.trace("<Detail /> oninit");
    },
    view: ({ attrs, state }) => (
        <div className="detail">
            <Searchbar search={attrs.store.select("search")} />
            {
                attrs.store.get("detail")
                    ? <Player id={attrs.store.get("detail")} store={attrs.store} />
                    : <Placeholder />
            }
        </div>
    )
};
