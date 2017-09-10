import * as m from "mithril";
import Home from "components/Pages/Home";
import Leaderboard from "components/Pages/Leaderboard";
import Chankaboard from "components/Pages/Chankaboard";
import Search from "components/Pages/Search";
import Profile from "components/Pages/Profile";
import Player from "components/Pages/Player";
import Faq from "components/Pages/Faq";
import NotFound from "components/Pages/Errors/NotFound";

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
    "HOME": Home,
    "SEARCH": Search,
    "FAQ": Faq,
    "LEADERBOARD": Leaderboard,
    "CHANKABOARD": Chankaboard,
    "PROFILE": Profile,
    "PLAYER": Player,
    "PLAYERTABS": Player,
    [NOT_FOUND]: NotFound
};

const breakpoints = {
    small: 0,
    medium: 768,
    large: 1200,
}

const App = {
    view({ attrs, state }) {
        const Component = attrs.Component;

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
                                {attrs.loading ? <Loading /> : <attrs.Component />}
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
        Component: componentMap[location.type],
        config: Object.assign({}, Pageconfig.default, Pageconfig[location.type]),
        loading,
        search,
        platform,
        tweets
    }
}

export default connect(mapStateToProps)(App)
