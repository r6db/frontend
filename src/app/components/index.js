import * as m from "mithril";
import page from "page";
import Home from "components/Pages/Home";
import Search from "components/Pages/Search";
import Detail from "components/Pages/Detail";
import Loading from "components/misc/Loading";
import Searchbar from "components/misc/Searchbar";
import Menu from "components/misc/Menu";
import Drawer from "components/misc/Drawer";
import Topbar from "components/misc/Topbar";
import ElementQuery from "components/misc/ElementQuery";
import Icon, { GLYPHS } from "components/misc/Icon";

import "./base.scss";
import "./app.scss";

import * as appstate from "lib/appstate";
import { Pageconfig } from "lib/constants";
import initRoutes from "lib/routing";
import debounce from "lib/debounce";

const optional = (pred, cb) => pred ? cb() : null;


const update = debounce(function () {
    console.debug("state changed, redrawing");
    console.debug("state", appstate.get());
    m.redraw();
});

const breakpoints = {
    small: 0,
    medium: 768,
    large: 1024,
}

export default {
    oninit(vnode) {
        initRoutes();
        appstate.onShouldRedraw(update);

    },
    view({ state }) {
        const { Component, search } = appstate.get();
        // extend default pageconfig
        const pconf = Object.assign({}, Pageconfig.default, appstate.get("config"));

        const Search = pconf.searchbar
            ? <Searchbar search={search} />
            : null;

        const TopbarComponent = pconf.menu
            ? <Topbar key="topbar">{Search}</Topbar>
            : null;
        return (
             <div className={"content-wrapper " + pconf.class}>
                <Drawer>
                    <Menu tweets={appstate.get("tweets")} />
                </Drawer>
                <div className="app">
                    <div className="app-background">
                        <img src="https://r6db.com/assets/bg_prim.svg" />
                    </div>
                    <div className="app-content">
                        {TopbarComponent}
                        <div className="app-page">
                            <ElementQuery className="contentsize" query={breakpoints}>
                                <Component
                                    loading={appstate.get("loading")}
                                    data={appstate.get("data")}
                                    store={appstate}
                                    search={search}
                                />
                            </ElementQuery>
                        </div>
                    </div>
                    {optional(appstate.get("loading"),
                        () => <Loading message={appstate.get("loading")} />)
                    }
                </div>
            </div>
        );
    }
};
