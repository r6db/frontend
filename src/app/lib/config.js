import { Platforms } from "./constants";
/**
 * this is used to set a css class on the root component
 * used for animations, page specific css, etc
 */
export const Pageconfig = Object.freeze({
    default: {
        id: "",
        class: "",
        searchbar: true,
        menu: true,
        footer: true
    },
    INITIAL: {
        id: "INITIAL",
        class: "is-initial",
        footer: false
    },
    SEARCH: { id: "SEARCH", class: "is-searching" },
    RESULT: { id: "RESULT", class: "is-results" },
    DETAIL: { id: "DETAIL", class: "is-detail" },
    LEADERBOARD: { id: "LEADERBOARD", class: "is-leaderboard" },
    CHANKABOARD: { id: "CHANKABOARD", class: "is-leaderboard" },
});


// find out which platform we display
let _platform;
const _host = window.location.host;

if (_host.match(/^ps4/)) {
    _platform = Platforms.ps4;
} else if (_host.match(/^xbox/)) {
    _platform = Platforms.xbox;
} else {
    _platform = Platforms.pc;
}

export const platform = _platform;