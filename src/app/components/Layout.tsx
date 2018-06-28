import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { NOT_FOUND } from "redux-first-router";
import { IntlProvider } from "react-intl";
import Loadable from "react-loadable";
import { languages } from "lib/constants";
import Cookiebanner from "components/misc/Cookiebanner";
import Loading from "components/misc/Loading";
import Topbar from "components/misc/Topbar";
import Menu from "components/misc/Menu";
import Drawer from "components/misc/Drawer";

import HOME from "./Pages/Home";
import SEARCH from "./Pages/Search";

import langEn from "i18n/en";

import "./layout.scss";
import "./base.scss";

const makeAsync = loader =>
    Loadable({
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
    SETTINGS: makeAsync(() => import("./Pages/Settings")),
    PRIVACY: makeAsync(() => import("./Pages/Privacy")),
    DELETE: makeAsync(() => import("./Pages/Delete")),
    SERVERFAULT: makeAsync(() => import("./Pages/Errors/ServerFault")),
    [NOT_FOUND]: makeAsync(() => import("./Pages/Errors/NotFound"))
};

pageMap.PLAYER.preload();

function Fragment(props) {
    return props.children || <span {...props} /> || null;
}


class Layout extends React.PureComponent<any, any> {
    constructor(props) {
        super(props);
        this.state = { locale: props.locale, messages: langEn };
    }
    loadLocale(locale: string) {
        console.log('attempting to load locale "%s"', locale);
        if (locale in languages) {
            languages[locale]
                .messageFn()
                .then(mod => {
                    if (process.env.NODE_ENV === "development") {
                        (window as any).i18n = {
                            messages: mod.default,
                            locale
                        };
                    }
                    this.setState({ messages: mod.default, locale: locale });
                })
                .catch(err => {
                    console.warn("error getting locale", err);
                });
        } else {
            console.warn("locale not known: %s", locale);
        }
    }
    componentWillMount() {
        this.loadLocale(this.state.locale);
    }
    componentWillReceiveProps() {
        if (this.props.locale !== this.state.locale) {
            this.loadLocale(this.props.locale);
        }
    }
    render() {
        if (!this.state.messages) {
            return null;
        }
        return (
            <IntlProvider
                locale={this.props.locale}
                messages={this.state.messages}
                textComponent={Fragment}
            >
                <div className={"app s " + this.props.location}>
                    <Drawer>
                        <Menu platform={this.props.platform} />
                    </Drawer>
                    <div className="app__page">
                        <Topbar onBurgerClick={this.props.toggleMenu} />
                        <this.props.Component />
                    </div>
                    <Cookiebanner />
                </div>
            </IntlProvider>
        );
    }
}

function mapStateToProps(state) {
    const { platform, settings, location, loading } = state;
    return {
        location: location.type,
        Component: pageMap[location.type],
        loading,
        platform,
        locale: settings.locale || "en"
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleMenu: () => dispatch({ type: "MENU_TOGGLE" })
    };
}
const Comp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
export default hot(module)(Comp);
