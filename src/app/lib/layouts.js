import { State } from "./constants";

const defaultLayout = {
    searchbar: true,
    menu: true,
    footer: true
};

export default {
    [State.INITIAL]: Object.assign({}, defaultLayout, {
        menu: false,
        footer: false
    }),
    [State.DETAIL]: defaultLayout,
    [State.SEARCH]: defaultLayout,
    [State.RESULT]: defaultLayout,
    [State.LEADERBOARD]: Object.assign({}, defaultLayout, {
        searchbar: false
    })
};