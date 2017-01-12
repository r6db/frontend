export const appname = "r6db";
export const appid = "r6db-frontend";
export const title = "R6DB - Rainbow 6 PC Player database";
export const baseurl = "https://r6db.com/";
export const v2Api = "https://r6db.com/api/v2";
export const State = Object.freeze({
    INITIAL: "is-initial",
    SEARCH: "is-searching",
    RESULT: "is-results",
    DETAIL: "is-detail",
    LEADERBOARD: "is-leaderboard"
});
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
export const Leaderboards = {
    ALL: "highest_skill_adjusted",
    APAC: "apac_skill_adjusted",
    EMEA: "emea_skill_adjusted",
    NCSA: "ncsa_skill_adjusted",
};