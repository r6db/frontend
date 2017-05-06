import Baobab from "baobab";
import { getTweets } from "./api";
import * as constants from "./constants";

const defaultState = {
    appstate: constants.Pageconfig.INITIAL,
    Component: null,
    TopbarComponent: null,
    debug: false,
    data: null,
    menu: false,
    tweets: [],
    loading: false,
    search: {
        query: "",
        exact: false
    }
};

const state = new Baobab(self.__INITIALSTATE || defaultState);
export default state;


function updateTweets() {
    getTweets().then(tweets => state.set("tweets", tweets));
}
setInterval(updateTweets, 2 * 60 * 1000);
updateTweets();
