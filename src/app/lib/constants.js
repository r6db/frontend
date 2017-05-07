export const appname = "r6db";
export const appid = "r6db";
export const title = "R6DB - Rainbow 6 Player database";
export const description= "R6DB is a fan-powered database for Rainbow Six: Siege. Search for Players, check Profiles or view the Leaderboard";
export const baseurl = "/";
export const v2Api = "/api/v2";

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
        footer: false,
        menu: false
    },
    SEARCH: { id: "SEARCH", class: "is-searching" },
    RESULT: { id: "RESULT", class: "is-results" },
    DETAIL: { id: "DETAIL", class: "is-detail" },
    LEADERBOARD: { id: "LEADERBOARD", class: "is-leaderboard" },
    CHANKABOARD: { id: "CHANKABOARD", class: "is-leaderboard" },
});

/**
 * the api returns ranks in a number format
 * we can use that number as index to get the label
 */
export const Ranks = [
    "Unranked",
    "Copper 4",
    "Copper 3",
    "Copper 2",
    "Copper Star",
    "Bronze 4",
    "Bronze 3",
    "Bronze 2",
    "Bronze Star",
    "Silver 4",
    "Silver 3",
    "Silver 2",
    "Silver Star",
    "Gold 4",
    "Gold 3",
    "Gold 2",
    "Gold Star",
    "Platinum 3",
    "Platinum 2",
    "Platinum Star",
    "Diamond"
];

/**
 * define our Leaderboards
 * id: url parameter we set for the board
 * board: api endpoint to call
 * label: you know..
 */
export const Leaderboards = {
    ALL: { id: "ALL", board: "highest_skill_adjusted", label: "Global" },
    APAC: { id: "APAC", board: "apac_skill_adjusted", label: "Asia & Pacific Area"},
    EMEA: { id: "EMEA", board: "emea_skill_adjusted", label: "Europe, Africa & Middle East" },
    NCSA: { id: "NCSA", board: "ncsa_skill_adjusted", label: "North, Central and South America" }
};

export const isConsole = /(xbox|ps4)/.test(window.location.href);
export const isPS4 = /(ps4)/.test(window.location.href);
export const isXbox = /(xbox)/.test(window.location.href);
export const isPC = !isConsole;

export const DATE_SHORT = "DD. MMM YYYY";
export const DATE_LONG = "DD. MMM YYYY HH:MM";
