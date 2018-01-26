import * as React from "react";
import { connect } from "react-redux";
import { NOT_FOUND } from "redux-first-router";
import Loadable from "react-loadable";
import Loading from "components/misc/Loading";
import Searchbar from "components/misc/Searchbar";
import Menu from "components/misc/Menu";
import Drawer from "components/misc/Drawer";
import Page, { PageHead, PageContent } from "components/misc/Page";
import Icon, { GLYPHS } from "components/misc/Icon";
import "./base.scss";
import "./app.scss";

const makeAsync = loader => Loadable({
    loader,
    loading: Loading
});

const pageMap = {
    HOME: makeAsync(() => import("./Pages/Home")),
    SEARCH: makeAsync(() => import("./Pages/Search")),
    FAQ: makeAsync(() => import("./Pages/Faq")),
    LEADERBOARD: makeAsync(() => import("./Pages/Leaderboard")),
    CHANKABOARD: makeAsync(() => import("./Pages/Leaderboard/Chankaboard")),
    PLAYER: makeAsync(() => import("./Pages/Player")),
    SIMPLE: makeAsync(() => import("./Pages/Simple")),
    PLAYERTABS: makeAsync(() => import("./Pages/Player")),
    COMPARISON: makeAsync(() => import("./Pages/Comparison")),
    ABOUT: makeAsync(() => import("./Pages/About")),
    MAINTENANCE: makeAsync(() => import("./Pages/Errors/Maintenance")),
    [NOT_FOUND]: makeAsync(() => import("./Pages/Errors/NotFound")),
};


function App(props) {
    return (
        <div className={"app " + props.location}>
            <div className="app__content">
                <Drawer>
                    <Menu platform={props.platform} />
                </Drawer>
                <div className="app__page">
                    {props.loading ? (
                        <Loading />
                    ) : (
                        <props.Component />
                    )}
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { platform, search, location, loading } = state;
    return {
        location: location.type,
        Component: pageMap[location.type],
        loading,
        platform,
    };
}

export default connect(mapStateToProps)(App);
