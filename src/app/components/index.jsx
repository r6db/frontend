import * as Inferno from "inferno";
import { connect } from "inferno-redux";
import AsyncComponent from "components/misc/AsyncComponent";
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
    HOME: () => import("./Pages/Home"),
    SEARCH: () => import("./Pages/Search"),
    FAQ: () => import("./Pages/Faq"),
    LEADERBOARD: () => import("./Pages/Leaderboard"),
    CHANKABOARD: () => import("./Pages/Leaderboard/Chankaboard"),
    PLAYER: () => import("./Pages/Player"),
    SIMPLE: () => import("./Pages/Simple"),
    PLAYERTABS: () => import("./Pages/Player"),
    COMPARISON: () => import("./Pages/Comparison"),
    ABOUT: () => import("./Pages/About"),
    MAINTENANCE: () => import("./Pages/Errors/Maintenance"),
    [NOT_FOUND]: () => import("./Pages/Errors/NotFound"),
};

function App(props) {
    console.log("App::render", props);
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
                    ) : <AsyncComponent importFn={props.importFn} /> }
                    <Footer />
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { platform, search, location, loading } = state;
    console.log("App::map_state_to_props", state.location.type);
    return {
        location: location.type,
        importFn: componentMap[location.type],
        loading,
        platform,
    };
}

export default connect(mapStateToProps)(App);
