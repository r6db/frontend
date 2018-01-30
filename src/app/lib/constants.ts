export const appname = "r6db";
export const appid = "5e23d930-edd3-4240-b9a9-723c673fb649";
export const title = "R6DB - Rainbow 6 Player database";
export const description =
    "R6DB is a fan-powered database for Rainbow Six: Siege. Search for Players, check Profiles or view the Leaderboard";
export const baseurl = "/";
export const v2Api = "/api/v2";

/**
 * define our Leaderboards
 * id: url parameter we set for the board
 * board: api endpoint to call
 * label: you know..
 */
export const LEADERBOARDS = {
    ALL: { id: "ALL", board: "highest_skill_adjusted", label: "Global" },
    APAC: {
        id: "APAC",
        board: "apac_skill_adjusted",
        label: "Asia & Pacific Area",
    },
    EMEA: {
        id: "EMEA",
        board: "emea_skill_adjusted",
        label: "Europe, Africa & Middle East",
    },
    NCSA: {
        id: "NCSA",
        board: "ncsa_skill_adjusted",
        label: "North, Central and South America",
    },
};

export const DATE_SHORT = "DD. MMM YYYY";
export const DATE_LONG = "DD. MMM YYYY HH:MM";

/**
 * the api returns ranks in a number format
 * we can use that number as index to get the label
 */
export const RANKS = [
    "Unranked",
    "Copper 4",
    "Copper 3",
    "Copper 2",
    "Copper 1",
    "Bronze 4",
    "Bronze 3",
    "Bronze 2",
    "Bronze 1",
    "Silver 4",
    "Silver 3",
    "Silver 2",
    "Silver 1",
    "Gold 4",
    "Gold 3",
    "Gold 2",
    "Gold 1",
    "Plat 3",
    "Plat 2",
    "Plat 1",
    "Diamond",
];
export const SHORTRANKS = [
    "-",
    "Copp 4",
    "Copp 3",
    "Copp 2",
    "Copp 1",
    "Bron 4",
    "Bron 3",
    "Bron 2",
    "Bron 1",
    "Slvr 4",
    "Slvr 3",
    "Slvr 2",
    "Slvr 1",
    "Gold 4",
    "Gold 3",
    "Gold 2",
    "Gold 1",
    "Plat 3",
    "Plat 2",
    "Plat 1",
    "Dia",
];
export const SEASONS = [
    "Release",
    "Black Ice",
    "Dust Line",
    "Skull Rain",
    "Red Crow",
    "Velvet Shell",
    "Operation Health",
    "Blood Orchid",
    "White Noise",
];

export const OPERATORS = {
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
    ela: { name: "Ela", side: "Defense", unit: "GROM" },
    frost: { name: "Frost", side: "Defense", unit: "JTF-2" },
    fuze: { name: "Fuze", side: "Attack", unit: "SPEZNAS" },
    glaz: { name: "Glaz", side: "Attack", unit: "SPEZNAS" },
    hibana: { name: "Hibana", side: "Attack", unit: "SAT" },
    iq: { name: "IQ", side: "Attack", unit: "GSG9" },
    jackal: { name: "Jackal", side: "Attack", unit: "GEO" },
    jager: { name: "Jäger", side: "Defense", unit: "GSG9" },
    kapkan: { name: "Kapkan", side: "Defense", unit: "SPEZNAS" },
    lesion: { name: "Lesion", side: "Defense", unit: "SDU" },
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
    ying: { name: "Ying", side: "Attack", unit: "SDU" },
    dokkaebi: { name: "Dokkaebi", side: "Attack", unit: "SMB" },
    vigil: { name: "Vigil", side: "Defense", unit: "SMB" },
    zofia: { name: "Zofia", side: "Attack", unit: "GROM" },
};

export const REGIONS = {
    emea: "Europe",
    ncsa: "America",
    apac: "Asia",
};
