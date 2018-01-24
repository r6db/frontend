import * as React from "react";
import { connect } from "react-redux";
import makeAsyncComponent from "components/misc/AsyncComponent";
import Loading from "components/misc/Loading";
import Searchbar from "components/misc/Searchbar";
import Menu from "components/misc/Menu";
import Drawer from "components/misc/Drawer";
import Page, { PageHead, PageContent } from "components/misc/Page";
import Footer from "components/misc/Footer";
import Icon, { GLYPHS } from "components/misc/Icon";
import { NOT_FOUND } from "redux-first-router";

import "./base.scss";
import "./app.scss";

const componentMap = {
    HOME: makeAsyncComponent(() => import("./Pages/Home")),
    SEARCH: makeAsyncComponent(() => import("./Pages/Search")),
    FAQ: makeAsyncComponent(() => import("./Pages/Faq")),
    LEADERBOARD: makeAsyncComponent(() => import("./Pages/Leaderboard")),
    CHANKABOARD: makeAsyncComponent(() => import("./Pages/Leaderboard/Chankaboard")),
    PLAYER: makeAsyncComponent(() => import("./Pages/Player")),
    SIMPLE: makeAsyncComponent(() => import("./Pages/Simple")),
    PLAYERTABS: makeAsyncComponent(() => import("./Pages/Player")),
    COMPARISON: makeAsyncComponent(() => import("./Pages/Comparison")),
    ABOUT: makeAsyncComponent(() => import("./Pages/About")),
    MAINTENANCE: makeAsyncComponent(() => import("./Pages/Errors/Maintenance")),
    [NOT_FOUND]: makeAsyncComponent(() => import("./Pages/Errors/NotFound")),
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
                        <div>
                            <Page className="page--empty">
                                <PageHead />
                                <PageContent />
                            </Page>
                            <Loading />
                        </div>
                    ) : (
                        <props.Component />
                    )}
                    <Footer />
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { platform, search, location, loading } = state;
    return {
        location: location.type,
        Component: componentMap[location.type],
        loading,
        platform,
    };
}

export default connect(mapStateToProps)(App);
