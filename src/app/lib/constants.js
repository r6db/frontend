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
    PROFILE: {id: "PROFILE", class: "is-profile"},
    LEADERBOARD: { id: "LEADERBOARD", class: "is-leaderboard" },
    CHANKABOARD: { id: "CHANKABOARD", class: "is-leaderboard" },
    FAQ: { id: "FAQ", class: "is-faq"}
});

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

export const platformShorthand = isPS4 ? 'psn' : isXbox ? 'xbl' : 'uplay';

export const DATE_SHORT = "DD. MMM YYYY";
export const DATE_LONG = "DD. MMM YYYY HH:MM";


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
export const Seasons = [
    "Release",
    "Black Ice",
    "Dust Line",
    "Skull Rain",
    "Red Crow",
    "Velvet Shell",
    "Operation Health"
]

export const Operators = {
    ash: { name: "Ash", side: "Attack", unit: "FBI" },
    bandit: { name: "Bandit", side: "Defense", unit: "GSG9" },
    blackbeard: { name: "Blackbeard", side: "Attack", unit: "SEALS" },
    blitz: { name: "Blitz", side: "Attack", unit: "GSG9" },
    buck: { name: "Buck", side: "Attack", unit: "JTF-2" },
    capitao: { name: "Capitão", side: "Attack", unit: "BOPE" },
    castle: { name: "Castle", side: "Defense", unit: "FBI" },
    caveira: { name: "Caveira", side: "Defense", unit: "BOPE" },
    doc: { name: "Doc", side: "Defense", unit: "GIGN" },
    echo: { name: "Echo", side: "Defense", unit: "SAT" },
    frost: { name: "Frost", side: "Defense", unit: "JTF-2" },
    fuze: { name: "Fuze", side: "Attack", unit: "SPEZNAS" },
    glaz: { name: "Glaz", side: "Attack", unit: "SPEZNAS" },
    hibana: { name: "Hibana", side: "Attack", unit: "SAT" },
    iq: { name: "IQ", side: "Attack", unit: "GSG9" },
    jackal: { name: "Jackal", side: "Attack", unit: "GEO" },
    jager: { name: "Jäger", side: "Defense", unit: "GSG9" },
    kapkan: { name: "Kapkan", side: "Defense", unit: "SPEZNAS" },
    mira: { name: "Mira", side: "Defense", unit: "GEO" },
    montagne: { name: "Montagne", side: "Attack", unit: "GIGN" },
    mute: { name: "Mute", side: "Defense", unit: "SAS" },
    pulse: { name: "Pulse", side: "Defense", unit: "FBI" },
    rook: { name: "Rook", side: "Defense", unit: "GIGN" },
    sledge: { name: "Sledge", side: "Attack", unit: "SAS" },
    smoke: { name: "Smoke", side: "Defense", unit: "SAS" },
    tachanka: { name: "Tachanka", side: "Defense", unit: "SPEZNAS" },
    thatcher: { name: "Thatcher", side: "Attack", unit: "SAS" },
    thermite: { name: "Thermite", side: "Attack", unit: "FBI" },
    twitch: { name: "Twitch", side: "Attack", unit: "GIGN" },
    valkyrie: { name: "Valkyrie", side: "Defense", unit: "SEALS" },
}

export const regions = {
    emea: "Europe, Africa & M.East",
    ncsa: "America",
    apac: "Asia"
};
