import m from "mithril";
import page from "page";
import Home from "./Home";
import Search from "./Search";
import Detail from "./Detail";
import Loading from "./misc/Loading";
import Searchbar from "./misc/Searchbar";
import Menu from "./misc/Menu";
import Icon, { GLYPHS } from "./misc/Icon";

import "./base.scss";
import "./app.scss";

import store from "lib/store";
import { Pageconfig } from "lib/constants";
import Log from "lib/log";
import initRoutes from "lib/routing";

const log = Log.child(__filename);

const optional = (pred, cb) => pred ? cb() : null;

const debounce = function (func, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) { func.apply(context, args); }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) { func.apply(context, args); }
    };
};

const update = debounce(function () {
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
        const { Component, data, search, loading, config } = store.get();
        // extend default pageconfig
        const pconf = Object.assign({}, Pageconfig.default, config);

        const Search = pconf.searchbar
            ? <Searchbar search={search} selector={store.select("search")} />
            : null;

        const Menubar = pconf.menu
            ? <Menu>{Search}</Menu>
            : Search;
        return (
            <div className={"app " + pconf.class}>
                <div className="app-background" role="presentation" >
                    <img src="/assets/bg_prim.svg" alt="" class="clear" />
                    <img src="/assets/bg_prim.svg" alt="" class="blur" />
                </div>
                <div className="app-page">
                    {Menubar}
                    <Component loading={loading} data={data} />
                </div>

                {optional(loading, () => <Loading />)}
            </div>
        );
    }
};
