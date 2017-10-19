import * as m from "mithril";
import AsyncComponent from "components/misc/AsyncComponent";
import Loading from "components/misc/Loading";
import Searchbar from "components/misc/Searchbar";
import Menu from "components/misc/Menu";
import Drawer from "components/misc/Drawer";
import Topbar from "components/misc/Topbar";
import ElementQuery from "components/misc/ElementQuery";
import Icon, { GLYPHS } from "components/misc/Icon";
import { Pageconfig } from "lib/constants";
import { connect } from "lib/store/connect";
import { NOT_FOUND } from "redux-first-router";

import "./base.scss";
import "./app.scss";

const componentMap = {
    "HOME": () => import("./pages/Home"),
    "SEARCH": () => import("./pages/Search"),
    "FAQ": () => import("./pages/Faq"),
    "LEADERBOARD": () => import("./pages/Leaderboard"),
    "CHANKABOARD": () => import("./pages/Chankaboard"),
    "PROFILE": () => import("./pages/Profile"),
    "PLAYER": () => import("./pages/Player"),
    "PLAYERTABS": () => import("./pages/Player"),
    [NOT_FOUND]: () => import("./pages/Errors/NotFound")
};

const breakpoints = {
    small: 0,
    medium: 768,
    large: 1200,
}

const App = {
    view({ attrs, state }) {

        const Search = attrs.config.searchbar
            ? <Searchbar search={attrs.search} />
            : null;

        const TopbarComponent = attrs.config.menu
            ? <Topbar key="topbar">{Search}</Topbar>
            : null;

        return (
             <div className={"content-wrapper " + attrs.location + " " + attrs.config.class}>
                <Drawer>
                    <Menu platform={attrs.platform} tweets={attrs.tweets} />
                </Drawer>
                <div className="app">
                    <div className="app-background">
                        <img src="/assets/bg.jpg" srcset="/assets/bg.jpg 1000w, /assets/bg@1.5x.jpg 1600w, /assets/bg@2x.jpg 2160w" alt="background image" />
                    </div>
                    <div className="app-content">
                        {TopbarComponent}
                        <div className="app-page">
                            <ElementQuery className="contentsize" query={breakpoints}>
                                {attrs.loading ? <Loading /> : null}
                                <AsyncComponent importFn={attrs.importFn} />
                            </ElementQuery>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (getState) => {
    const { platform, tweets, search, location, loading } = getState();
    return {
        location: location.type,
        importFn: componentMap[location.type],
        config: Object.assign({}, Pageconfig.default, Pageconfig[location.type]),
        loading,
        search,
        platform,
        tweets
    }
}

export default connect(mapStateToProps)(App)
