import Baobab from "baobab";
import * as constants from "./constants";

const defaultState = {
    appstate: constants.State.INITIAL,
    Component: null,
    debug: false,
    data: null,
    loading: false,
    search: {
        query: "",
        exact: false
    }
};

export default new Baobab(self.__INITIALSTATE || defaultState);