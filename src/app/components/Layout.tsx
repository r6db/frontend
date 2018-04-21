import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { NOT_FOUND } from "redux-first-router";
import Loadable from "react-loadable";
import Loading from "components/misc/Loading";
import Topbar from "components/misc/Topbar";
import Menu from "components/misc/Menu";
import Drawer from "components/misc/Drawer";

import HOME from "./Pages/Home";
import SEARCH from "./Pages/Search";

import "./layout.scss";
import "./base.scss";




const makeAsync = loader => Loadable({
    loader,
    loading: Loading
});

const pageMap = {
    HOME,
    SEARCH,
    FAQ: makeAsync(() => import("./Pages/Faq")),
    LEADERBOARD: makeAsync(() => import("./Pages/Leaderboard")),
    CHANKABOARD: makeAsync(() => import("./Pages/Leaderboard/Chankaboard")),
    PLAYER: makeAsync(() => import("./Pages/Player")),
    FAVORITES: makeAsync(() => import("./Pages/Favorites")),
    SIMPLE: makeAsync(() => import("./Pages/Simple")),
    PLAYERTABS: makeAsync(() => import("./Pages/Player")),
    COMPARISON: makeAsync(() => import("./Pages/Comparison")),
    ABOUT: makeAsync(() => import("./Pages/About")),
    SERVERFAULT: makeAsync(() => import("./Pages/Errors/ServerFault")),
    [NOT_FOUND]: makeAsync(() => import("./Pages/Errors/NotFound")),
};

pageMap.PLAYER.preload();


class Layout extends React.PureComponent<any, any>{

    render() {
        return (
            <div className={"app s " + this.props.location}>
                <Drawer>
                    <Menu platform={this.props.platform} />
                </Drawer>
                <div className="app__page">
                    <Topbar onBurgerClick={this.props.toggleMenu} />
                    <this.props.Component />
                </div>
            </div>
        );
    }
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

function mapDispatchToProps(dispatch, state) {
    return {
        toggleMenu: () => dispatch({ type: "MENU_TOGGLE" }),
    }
}
const Comp = connect(mapStateToProps, mapDispatchToProps)(Layout);
export default hot(module)(Comp);
