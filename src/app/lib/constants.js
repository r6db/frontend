export const appname = "r6db";
export const appid = "r6db-frontend";
export const title = "R6DB - Rainbow 6 PC Player database";
export const description= "R6DB is a fan-powered database for Rainbow Six: Siege PC. Search for Players, check Profiles or view the Leaderboard";
export const baseurl = "/";
export const v2Api = "/api/v2";

export const Platforms = Object.freeze({
    ps4: "ps4",
    xbox: "xbox",
    pc: "uplay"
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
export const OperatorProps = ["won", "lost", "kills", "deaths", "timePlayed"];

export const OperatorNames = {
    ash: "Ash",
    bandit: "Bandit",
    blackbeard: "Blackbeard",
    blitz: "Blitz",
    buck: "Buck",
    capitao: "Capitão",
    castle: "Castle",
    caveira: "Caveira",
    doc: "Doc",
    echo: "Echo",
    frost: "Frost",
    fize: "Fuze",
    glaz: "Glaz",
    hibana: "Hibana",
    iq: "IQ",
    jackal: "Jackal",
    jager: "Jäger",
    kapkan: "Kapkan",
    mira: "Mira",
    montagne: "Montagne",
    mute: "Mute",
    pulse: "Pulse",
    rook: "Rook",
    sledge: "Sledge",
    smoke: "Smoke",
    tachanka: "Tachanka",
    thatcher: "Thatcher",
    thermite: "Thermite",
    twitch: "Twitch",
    valkyrie: "Valkyrie"
};

/**
 * define our Regions
 * id: same as ranks region names! also used as url param for the leaderboard
 * board: api endpoint to for the leaderboard
 * label: you know..
 */
export const Regions = {
    all: { id: "all", board: "highest_skill_adjusted", label: "Global" },
    apac: { id: "apac", board: "apac_skill_adjusted", label: "Asia Pacific"},
    emea: { id: "emea", board: "emea_skill_adjusted", label: "Europe, Middle East & Africa" },
    ncsa: { id: "ncsa", board: "ncsa_skill_adjusted", label: "North, Central and South America" }
};


export const DATE_SHORT = "DD. MMM YYYY";
export const DATE_LONG = "DD. MMM YYYY HH:MM";