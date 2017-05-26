import * as m from "mithril";
import { parse } from "querystring";
import page from "page";
import * as appstate from "./appstate";
import { showMenu } from "components/misc/Drawer";
import { Pageconfig, Leaderboards } from "lib/constants";
import * as api from "lib/api";
import setMeta from "lib/meta";

const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;

import Home from "components/Pages/Home";
import Search from "components/Pages/Search";
import Detail from "components/Pages/Detail";
import Profile from "components/Pages/Profile"
import Leaderboard from "components/Pages/Leaderboard";
import Chankaboard from "components/Pages/Chankaboard";
import Faq from "components/Pages/Faq";

import { isConsole } from "lib/constants";

function analyticsMiddleware(context, next) {
    ga("set", "page", context.path);
    ga("send", "pageview");
    return next();
}
function menuMiddleware(context, next) {
    showMenu(false);
    return next();
}

export default function initRoutes() {
    page(analyticsMiddleware);
    page(menuMiddleware);
    page("/", function (context) {
        if (context.pathname.slice(0, 10) === "/#/player/") {
            console.debug("got a legacy url");
            const id = context.pathname.slice(11).split(/[\/?#]/)[0];
            page.redirect("/player/" + id);
            return;
        }
        console.debug("router mount <Home />");
        appstate.merge({
            config: Pageconfig.INITIAL,
            Component: Home,
            loading: false,
            data: null,
            search: ""
        });
        setMeta();
    });
    page("/search/:query", function (ctx) {
        console.debug("router mount <Search />");
        const qs = parse(ctx.querystring);
        if (ctx.params.query && ctx.params.query.length > 2) {
            appstate.merge({
                config: Pageconfig.SEARCH,
                Component: Search,
                loading: true,
                data: {
                    query: ctx.params.query,
                    result: []
                },
                search: ctx.params.query
            });
            api.findPlayer(ctx.params.query)
                .then(function (res) {
                    appstate.merge({
                        config: Pageconfig.RESULT,
                        data: {
                            query: ctx.params.query,
                            result: res
                        },
                        loading: false
                    });
                    setMeta({
                        title: `Search for ${ctx.params.query}`,
                        description: `Find ${ctx.params.query} in the community database for Rainbow Six: Siege`
                    });
                })
                .catch(function (err) {
                    console.warn(err);
                    appstate.merge({
                        config: Pageconfig.RESULT,
                        data: {
                            query: ctx.params.query,
                            result: []
                        },
                        loading: false
                    });
                    setMeta();
                });
        } else {
            page.redirect("/");
        }
    });
    page("/player/:id/extended", function (ctx) {
        const id = ctx.params.id;
        appstate.merge({
            config: Pageconfig.DETAIL,
            Component: Profile,
            loading: true,
            data: null
        });
        api.getPlayer(id)
            .then(function (res) {
                if (res.id === id) {
                    appstate.merge({
                        data: res,
                        loading: false
                    });
                    if (res.flags.noAliases === false) {
                        setMeta({
                            title: `${res.name}`,
                            description: `${res.name} player profile for Rainbow Six: Siege`,
                            image: isConsole ? `//ubisoft-avatars.akamaized.net/${ res.userId }/default_146_146.png` : `http://uplay-avatars.s3.amazonaws.com/${ res.id }/default_146_146.png`,
                            type: "profile"
                        });
                    } else {
                        setMeta({
                            title: `account ${id}`,
                            description: `${id} account details in the community database for Rainbow Six: Siege`
                        });
                    }
                } else {
                    console.info("discarded data from previous route");
                    appstate.set("loading", false);
                }
            })
            .catch(function (err) {
                console.warn(err);
                appstate.merge({
                    data: null,
                    loading: false
                });
                setMeta();
            });
    });
    page("/player/:id", function (ctx) {
        console.debug("router mount <Detail />");
        const id = ctx.params.id;
        appstate.merge({
            config: Pageconfig.DETAIL,
            Component: Detail,
            loading: true,
            data: null
        });
        api.getPlayer(id)
            .then(function (res) {
                if (res.id === id) {
                    appstate.merge({
                        data: res,
                        loading: false
                    });
                    if (res.flags.noAliases === false) {
                        setMeta({
                            title: `${res.name}`,
                            description: `${res.name} player profile for Rainbow Six: Siege`,
                            image: isConsole ? `//ubisoft-avatars.akamaized.net/${ res.userId }/default_146_146.png` : `http://uplay-avatars.s3.amazonaws.com/${ res.id }/default_146_146.png`,
                            type: "profile"
                        });
                    } else {
                        setMeta({
                            title: `account ${id}`,
                            description: `${id} account details in the community database for Rainbow Six: Siege`
                        });
                    }
                } else {
                    console.info("discarded data from previous route");
                    appstate.set("loading", false);
                }
            })
            .catch(function (err) {
                console.warn(err);
                appstate.merge({
                    data: null,
                    loading: false
                });
                setMeta();
            });
    });
    page("/leaderboard/", function () {
        page.redirect("/leaderboard/ALL");
    });
    page("/leaderboard/chanka", function () {
        const board = "operatorpvp_tachanka_turretkill";
        const boardLabel = "Chanka, Chanka Chanka, CHANKAAAA";
        console.debug("router mount <Chankaboard />");
        appstate.merge({
            config: Pageconfig.CHANKABOARD,
            Component: Chankaboard,
            loading: true,
            data: null
        });
        api.getLeaderboard(board)
            .then(function (res) {
                appstate.merge({
                    data: {
                        board,
                        entries: res
                    },
                    loading: false
                });
                setMeta({
                    title: "LMG kills leaderboard",
                    description: "top 100 Tachanka players in our database",
                    type: "website"
                });
            })
            .catch(function (err) {
                console.warn(err);
                setMeta();
            });
    });
    page("/leaderboard/:board", function (ctx) {
        const lb = Leaderboards[ctx.params.board] || Leaderboards.ALL;
        console.debug("router mount <Leaderboard />");
        appstate.merge({
            config: Pageconfig.LEADERBOARD,
            Component: Leaderboard,
            loading: true,
            data: null
        });
        api.getLeaderboard(lb.board)
            .then(function (res) {
                appstate.merge({
                    data: {
                        board: ctx.params.board,
                        entries: res
                    },
                    loading: false
                });
                setMeta({
                    title: `${lb.label} leaderboard`,
                    description: `find the top 100 players (${lb.label}) in our Database`,
                    type: "website"
                });
            })
            .catch(function (err) {
                console.warn(err);
                setMeta();
            });
    });

    page("/faq", function () {
        appstate.merge({
            config: Pageconfig.FAQ,
            Component: Faq,
            loading: false,
            data: null
        });
    });
    page("*", function (ctx) {
        if (ctx.path.startsWith("//")) {
            console.debug("trying to redirect path", ctx);
            page.redirect(ctx.path.substr(1));
        } else {
            console.warn("route not found", ctx);
            page.redirect("/");
        }
    });
    page.start();
}
