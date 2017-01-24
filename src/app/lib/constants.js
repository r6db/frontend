export const appname = "r6db";
export const appid = "r6db-frontend";
export const title = "R6DB - Rainbow 6 PC Player database";
export const baseurl = "https://r6db.com/";
export const v2Api = "https://r6db.com/api/v2";

/**
 * this is used to set a css class on the root component
 * used for animations, page specific css, etc
 */
export const State = Object.freeze({
    INITIAL: "is-initial",
    SEARCH: "is-searching",
    RESULT: "is-results",
    DETAIL: "is-detail",
    LEADERBOARD: "is-leaderboard",
    CHANKABOARD: "is-leaderboard"
});

/**
 * the api returns ranks in a number format
 * we can use that number as index to get the label
 */
export const Ranks = [
    "Unranked",
    "Copper 1",
    "Copper 2",
    "Copper 3",
    "Copper 4",
    "Bronze 1",
    "Bronze 2",
    "Bronze 3",
    "Bronze 4",
    "Silver 1",
    "Silver 2",
    "Silver 3",
    "Silver 4",
    "Gold 1",
    "Gold 2",
    "Gold 3",
    "Gold 4",
    "Platinum 1",
    "Platinum 2",
    "Platinum 3",
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
