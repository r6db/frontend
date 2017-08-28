import * as m from "mithril";
import Home from "components/Pages/Home";
import Leaderboard from "components/Pages/Leaderboard";
import Chankaboard from "components/Pages/Chankaboard";
import Search from "components/Pages/Search";
import Detail from "components/Pages/Detail";
import Profile from "components/Pages/Profile";
import Faq from "components/Pages/Faq";

import Loading from "components/misc/Loading";
import Searchbar from "components/misc/Searchbar";
import Menu from "components/misc/Menu";
import Drawer from "components/misc/Drawer";
import Topbar from "components/misc/Topbar";
import ElementQuery from "components/misc/ElementQuery";
import Icon, { GLYPHS } from "components/misc/Icon";
import { Pageconfig } from "lib/constants";
import { connect } from "lib/store/connect";

import "./base.scss";
import "./app.scss";

const componentMap = {
    "HOME": Home,
    "SEARCH": Search,
    "FAQ": Faq,
    "LEADERBOARD": Leaderboard,
    "CHANKABOARD": Chankaboard,
    "DETAIL": Detail,
    "PROFILE": Profile
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
             <div className={"content-wrapper " + attrs.config.class}>
                <Drawer>
                    <Menu platform={attrs.platform} tweets={attrs.tweets} />
                </Drawer>
                <div className="app">
                    <div className="app-background">
                        <img src="https://r6db.com/assets/bg_prim.svg" />
                    </div>
                    <div className="app-content">
                        {TopbarComponent}
                        <div className="app-page">
                            <ElementQuery className="contentsize" query={breakpoints}>
                                {attrs.loading ? null : <attrs.Component />}
                            </ElementQuery>
                        </div>
                    </div>
                    {attrs.loading
                        ? <Loading />
                        : null}
                </div>
            </div>
        );
    }
};

const mapStateToProps = (getState) => {
    const { platform, tweets, search, location, loading } = getState();
    return {
        Component: componentMap[location.type],
        config: Object.assign({}, Pageconfig.default, Pageconfig[location.type]),
        loading,
        search,
        platform,
        tweets
    }
}

export default connect(mapStateToProps)(App)
