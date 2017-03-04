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


export const platform = "uplay";