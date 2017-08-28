import { redirect, push, NOT_FOUND } from "redux-first-router";
import { Leaderboards } from "lib/constants";
import * as api from "../api";
import setMeta from "lib/meta";

export default {
    HOME: "/",
    SEARCH: {
        path: "/search/:query",
        thunk: async (dispatch, getState) => {
            const { location } = getState();
            const query = location.payload.query;

            ga("send", "event", "search", "query", query);

            api.findPlayer(query)
                .then(result => {
                    setMeta({
                        title: `Search for ${query}`,
                        description: `Find ${query} in the community database for Rainbow Six: Siege`
                    });
                    dispatch({ type: "SEARCH_FETCHED", payload: { query, result } });
                })
                .catch(error => {
                    dispatch({ type: "SEARCH_FAILED", payload: { query, error } });
                });
        }
    },
    LEADERBOARD_ENTRY: {
        path: "/leaderboard",
        thunk: async (dispatch, getState) => {
            dispatch(redirect({ type: "LEADERBOARD", payload: { board: "ALL" } }));
        }
    },
    CHANKABOARD: {
        path: "/leaderboard/CHANKA",
        thunk: async (dispatch, getState) => {

            ga("send", "event", "leaderboard", "view", "CHANKA");
            api.getLeaderboard("operatorpvp_tachanka_turretkill")
                .then(entries => {
                    setMeta({
                        title: "LMG kills leaderboard",
                        description: "top 100 Tachanka players in our database",
                        type: "website"
                    });
                    dispatch({ type: "LEADERBOARD_FETCHED", payload: { board: "CHANKA", entries } })
                })
                .catch(error => dispatch({ type: "LEADERBOARD_FAILED", payload: { board: "CHANKA", error } }));
        }
    },
    LEADERBOARD: {
        path: "/leaderboard/:board",
        thunk: async (dispatch, getState) => {
            const { board: b } = getState().location.payload;
            const board = b.toUpperCase();
            if (board === "CHANKA") { return; }
            ga("send", "event", "leaderboard", "view", board);

            const lbConfig = Leaderboards[board];

            api.getLeaderboard(lbConfig.board)
                .then(entries => {

                    setMeta({
                        title: `${lbConfig.label} leaderboard`,
                        description: `find the top 100 players (${lbConfig.label}) in our Database`,
                        type: "website"
                    });
                    dispatch({ type: "LEADERBOARD_FETCHED", payload: { board, entries } })
                })
                .catch(error => dispatch({ type: "LEADERBOARD_FAILED", payload: { board, error } }));
        }
    },
    FAQ: "/faq",
    DETAIL: {
        path: "/profile/:id/simple",
        thunk: async (dispatch, getState) => {
            const { id } = getState().location.payload;
            api.getPlayer(id)
                .then(function (player) {
                    dispatch({ type: "PLAYER_FETCHED", payload: { id, player } });
                    if (res.flags.noAliases === false) {
                        setMeta({
                            title: `${player.name}`,
                            description: `${player.name} player profile for Rainbow Six: Siege`,
                            image: isConsole ? `//ubisoft-avatars.akamaized.net/${ player.userId }/default_146_146.png` : `http://uplay-avatars.s3.amazonaws.com/${ player.id }/default_146_146.png`,
                            type: "profile"
                        });
                     } else {
                         setMeta({
                             title: `account ${id}`,
                             description: `${id} account details in the community database for Rainbow Six: Siege`
                         });
                     }
            })
            .catch(error => dispatch({ type: "PLAYER_FAILED", payload: { id, error } }));
        }
    },
    PROFILE: {
        path: "/profile/:id",
        thunk: async (dispatch, getState) => {
            const { id } = getState().location.payload;
            api.getPlayer(id)
                .then(function (player) {
                    dispatch({ type: "PLAYER_FETCHED", payload: { id, player } });
                    if (res.flags.noAliases === false) {
                        setMeta({
                            title: `${player.name}`,
                            description: `${player.name} in-depth player statistics for Rainbow Six: Siege`,
                            image: isConsole ? `//ubisoft-avatars.akamaized.net/${ player.userId }/default_146_146.png` : `http://uplay-avatars.s3.amazonaws.com/${ player.id }/default_146_146.png`,
                            type: "profile"
                        });
                     } else {
                         setMeta({
                             title: `account ${id}`,
                             description: `${id} account details in the community database for Rainbow Six: Siege`
                         });
                     }
            })
            .catch(error => dispatch({ type: "PLAYER_FAILED", payload: { id, error } }));
        }
    }
}