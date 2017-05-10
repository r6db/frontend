import m from "mithril";
import page from "page";
import Home from "components/Pages/Home";
import Search from "components/Pages/Search";
import Detail from "components/Pages/Detail";
import Loading from "components/misc/Loading";
import Searchbar from "components/misc/Searchbar";
import Menu from "components/misc/Menu";
import Drawer from "components/misc/Drawer";
import Topbar from "components/misc/Topbar";

import Icon, { GLYPHS } from "components/misc/Icon";

import "./base.scss";
import "./app.scss";

import store from "lib/store";
import { Pageconfig } from "lib/constants";
import initRoutes from "lib/routing";


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
    console.debug("state changed, redrawing");
    console.debug("state", store.get());
    m.redraw();
});

export default {
    oninit(vnode) {
        initRoutes();
        store.select("data").on("update", update);
        store.select("tweets").on("update", update);
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

        const TopbarComponent = pconf.menu
            ? <Topbar>{Search}</Topbar>
            : null;
        return (
             <div className={"content-wrapper " + pconf.class}>
                <Drawer open={store.select("menu")}> 
                    <Menu loading={loading} data={data} store={store} search={search}  />
                </Drawer>
                <div className="app">
                    <div className="app-background">
                        <img src="/assets/bg_prim.svg" />
                    </div>
                    <div className="app-content">
                        {TopbarComponent}
                        <div className="app-page">
                            <Component loading={loading} data={data} store={store} search={search} />
                        </div>
                    </div>
                    {optional(loading, () => <Loading />)}
                </div>
            </div>
        );
    }
};
