import { OPERATORS } from "./constants";

export enum Platform {
    PC = "PC",
    PS4 = "PS4",
    XBOX = "XBOX"
}

export enum Region {
    APAC = "apac",
    EMEA = "emea",
    NCSA = "ncsa"
}

export interface IRankBase {
    mmr: number;
    rank: number;
}

export interface ISearchResponseProfileAlias {
    name: string;
    created_at: string | Date;
}

export interface ISearchProfileAlias extends ISearchResponseProfileAlias {
    created_at: Date;
}

export interface ISearchResponseProfile {
    id: string;
    userId: string;
    platform: Platform;
    flair?: string;
    level: number;
    created_at: string;
    updated_at: string;
    lastPlayed: {
        casual: number;
        ranked: number;
        last_played: string;
    };
    name: string;
    ranks: {
        apac: IRankBase;
        emea: IRankBase;
        ncsa: IRankBase;
    };
    aliases: ISearchResponseProfileAlias[];
}

export interface ISearchProfile extends ISearchResponseProfile {
    aliases: ISearchProfileAlias[];
}

export interface IRank extends IRankBase {
    region: Region;
    wins: number;
    losses: number;
    abandons: number;
    max_mmr: number;
    mmr: number;
    rank: number;
    max_rank: number;
    season: number;
    skill_mean: number;
    skill_stdev: number;
}

export interface IRankGroup {
    apac: IRank;
    emea: IRank;
    ncsa: IRank;
    season: number;
}

export interface IOperator {
    won: number;
    lost: number;
    kills: number;
    deaths: number;
    timePlayed: number;
    name: string;
}

export interface IOperators {
    [string: number]: IOperator;
}

export interface IQueueStats {
    deaths: number;
    kills: number;
    lost: number;
    played: number;
    timePlayed: number;
    won: number;
}

export interface IRankedStats extends IQueueStats {
    abandons: number;
}

export interface IGeneralStats {
    assists: number;
    blindKills: number;
    bulletsFired: number;
    bulletsHit: number;
    dbno: number;
    dbnoAssists: number;
    deaths: number;
    gadgetsDestroyed: number;
    headshot: number;
    hostageDefense: number;
    hostageRescue: number;
    kills: number;
    lost: number;
    meleeKills: number;
    penetrationKills: number;
    played: number;
    rappelBreaches: number;
    revives: number;
    revivesDenied: number;
    serverAggression: number;
    serverDefender: number;
    serversHacked: number;
    suicides: number;
    timePlayed: number;
    won: number;
}

export interface IStats {
    bomb: {
        bestScore: number;
        lost: number;
        played: number;
        won: number;
    };
    casual: IQueueStats;
    custom: {
        timePlayed: number;
    };
    general: IGeneralStats;
    hostage: {
        bestScore: number;
        lost: number;
        played: number;
        won: number;
    };
    operator: IOperators;
    ranked: IRankedStats;
    secure: {
        bestScore: number;
        lost: number;
        played: number;
        won: number;
    };
}

export interface IAlteredStats extends IStats {
    general: IGeneralStats & {
        hitChance?: number;
        headshotChance?: number;
        headshotRatio?: number;
    };
}
export interface IPastRank {
    rank: number;
    max_rank: number;
    season: number;
    mmr: number;
    max_mmr: number;
}

export interface IAlteredPlayer extends IPlayerResponse {
    updateAvailableAt: Date;
    pastRanks: any;
    stats: IAlteredStats;
    snapshots: { season: number; stats: IAlteredStats; clean: boolean }[];
}

export interface IPlayerResponse {
    id: string;
    userId: string;
    platform: Platform;
    flair: string;
    level: number;
    created_at: string;
    updated_at: string;
    lastPlayed: {
        casual: number;
        ranked: number;
        last_played: string;
    };
    name: string;
    rank: IRankGroup;
    seasonRanks: IRankGroup[];
    stats: IStats;
    placements: {
        global: null | number;
        apac?: number;
        emea?: number;
        ncsa?: number;
    };
    progressions: IProgression[];
    aliases: ISearchProfileAlias[];
    serverTime: string;
    updateAvailableAt?: string | Date;
    seasonStats: {
        [season: string]: IStats;
    };
}

export interface IProgressionRank extends IRankBase {
    abandons: number;
    losses: number;
    skill_mean: number;
    wins: number;
}

export interface IProgression {
    created_at: string;
    updated_at: string;
    placements: {};
    ranks: {
        apac: IProgressionRank;
        emea: IProgressionRank;
        ncsa: IProgressionRank;
    };
    stats: IStats;
}

export type LeaderboardResponse = ILeaderboardPlacement[];

export interface ILeaderboardPlacement {
    id: string;
    userid: string;
    name: string;
    placement: number;
    platform: Platform;
    value: number | string;
}

export interface ICommunityRanks {
    apac: IRegionCommunityRanks[];
    emea: IRegionCommunityRanks[];
    ncsa: IRegionCommunityRanks[];
}

export interface IRegionCommunityRanks {
    platform: Platform;
    region: Region;
    rank: number;
    amount: number;
}
