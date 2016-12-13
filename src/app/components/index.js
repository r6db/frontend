import m from "mithril";
import page from "page";
import Home from "./Home";
import Search from "./Search";
import Detail from "./Detail";
import Loading from "./misc/Loading";
import Searchbar from "./misc/Searchbar";
import "./app.scss";

import debounce from "lodash/debounce";
import store from "lib/store";
import Log from "lib/log";
import initRoutes from "lib/routing";

const log = Log.child(__filename);

const optional = (pred, cb) => pred ? cb() : null;

const update = debounce(function() {
    log.trace("state changed, redrawing");
    log.debug("state", store.get());
    m.redraw();
});

export default {
    oninit(vnode) {
        initRoutes();
        store.select("data").on("update", update);
        store.select("loading").on("update", update);
        store.select("component").on("update", update);
        
    },
    view({ state }) {
        const { Component, data, search, loading, appstate } = store.get();
        return (
            <div className={"app " + appstate}>
                <div className="app-background" role="presentation" >
                    <img src="/assets/bg_prim.svg" class="clear" />
                    <img src="/assets/bg_prim.svg" class="blur" />
                </div>
                <div className="app-page">
                    <Searchbar search={search} selector={store.select("search")} />
                    <Component loading={loading} data={data} />
                </div>
                {optional(loading, () => <Loading /> )}
            </div>
        );
    } 
};
