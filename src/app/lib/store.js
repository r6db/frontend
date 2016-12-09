import Baobab from "baobab";
import * as constants from "./constants";

const defaultState = {
    appstate: constants.State.INITIAL,
    loading: false,
    detail: null,
    search: {
        query: "",
        exact: false
    }
};

export default new Baobab(self.__INITIALSTATE || defaultState);