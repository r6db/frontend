import { State } from "./constants";

const defaultLayout = {
    searchbar: true,
    menu: true,
    footer: true
};

export default {
    [State.INITIAL]: Object.assign({}, defaultLayout, {
        footer: false
    }),
    [State.DETAIL]: defaultLayout,
    [State.SEARCH]: defaultLayout,
    [State.RESULT]: defaultLayout,
    [State.LEADERBOARD]: defaultLayout
};