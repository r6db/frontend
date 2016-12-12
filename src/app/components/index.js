import m from "mithril";
import page from "page";
import Home from "./Home";
import Search from "./Search";
import Detail from "./Detail";
import Loading from "./misc/Loading";


import debounce from "lodash/debounce";
import store from "lib/store";
import Log from "lib/log";
import initRoutes from "lib/routing";

const log = Log.child(__filename);

const optional = (pred, cb) => pred ? cb() : null;

export default {
    oninit(vnode) {
        initRoutes();
        store.on("update", function () {
            log.trace("state changed, redrawing");
            m.redraw();
        });
        
    },
    view({ state }) {
        const { Component, data, search, loading, appstate } = store.get();
        return (
            <div className={"app " + appstate}>
                <div className="app-background">
                    <img src="/assets/nippon.jpg" className="clear" />
                    <img src="/assets/nippon-blurred.jpg" className="blur" />
                </div>
                <div className="app-page">
                    <Component data={data} search={search} />
                </div>
                {optional(loading, () => <Loading /> )}
            </div>
        );
    } 
};
