export const appname = "r6db";
export const appid = "r6db-frontend";
export const title = "R6DB - Rainbow 6 PC Player database";
export const description= "R6DB is a fan-powered database for Rainbow Six: Siege PC. Search for Players, check Profiles or view the Leaderboard";
export const baseurl = "https://r6db.com/";
export const v2Api = "https://r6db.com/api/v2";

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
 * define the possible weapon types
 */
export const WeaponTypes = {
    "assault": { id: "assault", label: "Assault Rifle" },
    "launcher": { id: "launcher", label: "Launcher" },
    "lmg": { id: "lmg", label: "Light Machine Gun" },
    "mp": { id: "mp", label: "Machine Pistol" },
    "pistol": { id: "pistol", label: "Pistol" },
    "shotgun": { id: "shotgun", label: "Shotgun" },
    "smg": { id: "smg", label: "Sub Machine Gun" },
    "snipet": { id: "sniper", label: "Sniper Rifle" },
    "B": { id: "B", label: "B (meaning unknown)"}
};

/**
 * define our Regions
 * id: same as ranks region names! also used as url param for the leaderboard
 * board: api endpoint to for the leaderboard
 * label: you know..
 */
export const Regions = {
    all: { id: "all", board: "highest_skill_adjusted", label: "Global" },
    apac: { id: "apac", board: "apac_skill_adjusted", label: "Asia & Pacific Area"},
    emea: { id: "emea", board: "emea_skill_adjusted", label: "Europe, Africa & Middle East" },
    ncsa: { id: "ncsa", board: "ncsa_skill_adjusted", label: "North, Central and South America" }
};


export const DATE_SHORT = "DD. MMM YYYY";