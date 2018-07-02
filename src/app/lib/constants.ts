import s0Logo from "assets/seasonlogos/R6-Default-Horizontal.svg";
const s1Cover = require("assets/backgrounds/blackice1.jpg?sizes[]=300&sizes[]=600&sizes[]=1200w");
import s1Logo from "assets/seasonlogos/R6-OPBlackIce-Horizontal.svg";
const s2Cover = require("assets/backgrounds/dustline1.jpg?sizes[]=300&sizes[]=600&sizes[]=1200w");
import s2Logo from "assets/seasonlogos/R6-OPDustLine-Horizontal.svg";
const s3Cover = require("assets/backgrounds/skullrain1.jpg?sizes[]=300&sizes[]=600&sizes[]=1200w");
import s3Logo from "assets/seasonlogos/R6-OPSkullRain-Horizontal.svg";
const s4Cover = require("assets/backgrounds/redcrow1.jpg?sizes[]=300&sizes[]=600&sizes[]=1200w");
import s4Logo from "assets/seasonlogos/R6-OPRedCrow-Horizontal.svg";
const s5Cover = require("assets/backgrounds/velvetshell1.jpg?sizes[]=300&sizes[]=600&sizes[]=1200w");
import s5Logo from "assets/seasonlogos/R6-OPVelvetShell-Horizontal.svg";
const s6Cover = require("assets/backgrounds/ophealth1.jpg?sizes[]=300&sizes[]=600&sizes[]=1200w");
import s6Logo from "assets/seasonlogos/R6-OPHealth-Horizontal.svg";
const s7Cover = require("assets/backgrounds/bloodorchid1.jpg?sizes[]=300&sizes[]=600&sizes[]=1200w");
import s7Logo from "assets/seasonlogos/R6-OPBloodOrchid-Horizontal.svg";
const s8Cover = require("assets/backgrounds/whitenoise1.jpg?sizes[]=300&sizes[]=600&sizes[]=1200w");
import s8Logo from "assets/seasonlogos/R6-OPWhiteNoise-Horizontal.svg";
const s9Cover = require("assets/backgrounds/chimera2.jpg?sizes[]=300&sizes[]=600&sizes[]=1200w");
import s9Logo from "assets/seasonlogos/R6-OPChimera-Horizontal.svg";
const s10Cover = require("assets/backgrounds/parabellum2.jpg?sizes[]=300&sizes[]=600&sizes[]=1200w"); //needs background images
import s10Logo from "assets/seasonlogos/R6-OPParaBellum-Horizontal.svg";

export const appname = "r6db";
export const appid = "b0815d12-ce26-462f-85ec-b866f24db0f0";
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
        label: "Asia & Pacific Area"
    },
    EMEA: {
        id: "EMEA",
        board: "emea_skill_adjusted",
        label: "Europe, Africa & Middle East"
    },
    NCSA: {
        id: "NCSA",
        board: "ncsa_skill_adjusted",
        label: "North, Central and South America"
    }
};

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
    "Platinum 3",
    "Platinum 2",
    "Platinum 1",
    "Diamond"
];

interface ISeason {
    id: number;
    fullId: string;
    name: string;
    dateStart: Date | null;
    dateEnd: Date | null;
    cover: { src: string; srcSet: string; placeholder: string };
    logo: any;
}
export const SEASONS: ISeason[] = [
    {
        id: 0,
        fullId: "Y1S0",
        name: "Release",
        dateStart: new Date("2016-12-01"),
        dateEnd: new Date("2017-02-01"),
        cover: null,
        logo: s0Logo
    },
    {
        id: 1,
        fullId: "Y1S1",
        name: "Black Ice",
        dateStart: null,
        dateEnd: null,
        cover: s1Cover,
        logo: s1Logo
    },
    {
        id: 2,
        fullId: "Y1S2",
        name: "Dust Line",
        dateStart: null,
        dateEnd: null,
        cover: s2Cover,
        logo: s2Logo
    },
    {
        id: 3,
        fullId: "Y1S3",
        name: "Skull Rain",
        dateStart: null,
        dateEnd: null,
        cover: s3Cover,
        logo: s3Logo
    },
    {
        id: 4,
        fullId: "Y1S4",
        name: "Red Crow",
        dateStart: null,
        dateEnd: null,
        cover: s4Cover,
        logo: s4Logo
    },
    {
        id: 5,
        fullId: "Y2S1",
        name: "Velvet Shell",
        dateStart: null,
        dateEnd: null,
        cover: s5Cover,
        logo: s5Logo
    },
    {
        id: 6,
        fullId: "Y2S2",
        name: "Health",
        dateStart: null,
        dateEnd: null,
        cover: s6Cover,
        logo: s6Logo
    },
    {
        id: 7,
        fullId: "Y2S3",
        name: "Blood Orchid",
        dateStart: null,
        dateEnd: null,
        cover: s7Cover,
        logo: s7Logo
    },
    {
        id: 8,
        fullId: "Y2S4",
        name: "White Noise",
        dateStart: null,
        dateEnd: null,
        cover: s8Cover,
        logo: s8Logo
    },
    {
        id: 9,
        fullId: "Y3S1",
        name: "Chimera",
        dateStart: null,
        dateEnd: null,
        cover: s9Cover,
        logo: s9Logo
    },
    {
        id: 10,
        fullId: "Y3S2",
        name: "Para Bellum",
        dateStart: null,
        dateEnd: null,
        cover: s10Cover,
        logo: s10Logo
    }
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
    fuze: { name: "Fuze", side: "Attack", unit: "SPETSNAZ" },
    glaz: { name: "Glaz", side: "Attack", unit: "SPETSNAZ" },
    hibana: { name: "Hibana", side: "Attack", unit: "SAT" },
    iq: { name: "IQ", side: "Attack", unit: "GSG9" },
    jackal: { name: "Jackal", side: "Attack", unit: "GEO" },
    jager: { name: "Jäger", side: "Defense", unit: "GSG9" },
    kapkan: { name: "Kapkan", side: "Defense", unit: "SPETSNAZ" },
    lesion: { name: "Lesion", side: "Defense", unit: "SDU" },
    mira: { name: "Mira", side: "Defense", unit: "GEO" },
    montagne: { name: "Montagne", side: "Attack", unit: "GIGN" },
    mute: { name: "Mute", side: "Defense", unit: "SAS" },
    pulse: { name: "Pulse", side: "Defense", unit: "FBI" },
    rook: { name: "Rook", side: "Defense", unit: "GIGN" },
    sledge: { name: "Sledge", side: "Attack", unit: "SAS" },
    smoke: { name: "Smoke", side: "Defense", unit: "SAS" },
    tachanka: { name: "Tachanka", side: "Defense", unit: "SPETSNAZ" },
    thatcher: { name: "Thatcher", side: "Attack", unit: "SAS" },
    thermite: { name: "Thermite", side: "Attack", unit: "FBI" },
    twitch: { name: "Twitch", side: "Attack", unit: "GIGN" },
    valkyrie: { name: "Valkyrie", side: "Defense", unit: "SEALS" },
    ying: { name: "Ying", side: "Attack", unit: "SDU" },
    dokkaebi: { name: "Dokkaebi", side: "Attack", unit: "SMB" },
    vigil: { name: "Vigil", side: "Defense", unit: "SMB" },
    zofia: { name: "Zofia", side: "Attack", unit: "GROM" },
    lion: { name: "Lion", side: "Attack", unit: "CBRN" },
    finka: { name: "Finka", side: "Attack", unit: "CBRN" },
    alibi: { name: "Alibi", side: "Defense", unit: "GIS" },
    maestro: { name: "Maestro", side: "Defense", unit: "GIS" },
    recruitsas: { name: "Recruit (SAS)", side: "Recruit", unit: "SAS"},
    recruitfbi: { name: "Recruit (FBI)", side: "Recruit", unit: "FBI"},
    recruitgign: { name: "Recruit (GIGN)", side: "Recruit", unit: "GIGN"},
    recruitspetsnaz: { name: "Recruit (SPETSNAZ)", side: "Recruit", unit: "SPETSNAZ"},
    recruitgsg9: { name: "Recruit (GSG9)", side: "Recruit", unit: "GSG9"},
};

export const REGIONS = {
    emea: "Europe",
    ncsa: "America",
    apac: "Asia"
};

export const ADCONFIG = {
    client: "ca-pub-4708879883364551",
    defaultSlot: "6650835115",
    defaultFormat: "auto"
};
