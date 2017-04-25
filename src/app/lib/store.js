import Baobab from "baobab";
import * as constants from "./constants";

const defaultState = {
    appstate: constants.Pageconfig.INITIAL,
    Component: null,
    debug: false,
    data: null,
    menu: false,
    loading: false,
    search: {
        query: "",
        exact: false
    }
};

export default new Baobab(self.__INITIALSTATE || defaultState);