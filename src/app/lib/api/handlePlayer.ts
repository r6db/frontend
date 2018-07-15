import { OPERATORS, SEASONS } from "lib/constants";
import * as diffInDays from "date-fns/difference_in_days";
import objectDiff, { DiffStrategy } from "lib/objectDiff";
import {
    IPlayerResponse,
    IRankGroup,
    IAlteredStats,
    IAlteredPlayer
} from "../interfaces";

const earliestDate = new Date("2015-01-01");

const sum = (x, y) => x + y;
const fixAlias = alias => {
    // eslint-disable-next-line camelcase
    const d = new Date(alias.created_at);
    alias.created_at = alias.created_at && d > earliestDate ? d : null;
    return alias;
};

const getComputedStats = stats => {
    const hitChance = (stats.bulletsHit * 100) / (stats.bulletsFired || 1);
    const headshotChance = (stats.headshot * 100) / (stats.bulletsHit || 1);
    const headshotRatio = (stats.headshot * 100) / (stats.kills || 1);
    return { hitChance, headshotChance, headshotRatio };
};

const getAbandons = (ranks: IRankGroup[]) => {
    return ranks
        .filter(x => !!x)
        .map(x => [x.ncsa, x.emea, x.apac].map(y => y.abandons).reduce(sum, 0))
        .reduce(sum, 0);
};

export default function(player: IPlayerResponse): IAlteredPlayer {
    const p = { ...player } as IAlteredPlayer;
    let rank = p.rank;
    if (!rank || Object.keys(rank).length == 0) {
        rank = null;
    }
    if (!p.stats || Object.keys(p.stats).length == 0) {
        p.stats = null;
    }
    p.seasonRanks = [...p.seasonRanks, p.rank];

    // progs are sorted by date descending, we want ascending for diffs in reduce loops
    p.progressions = p.progressions.reverse();

    // build pastRanks
    const allRanks = p.seasonRanks
        .filter(x => !!x)
        .reduce((acc: IRankGroup[], rank) => {
            const alreadyHasSeason = !!acc.filter(x => x.season === rank.season)
                .length;
            if (!alreadyHasSeason) {
                acc.push(rank);
            }
            return acc;
        }, []);
    p.pastRanks = allRanks
        .map(x => {
            const sortedRanks = [x.ncsa, x.emea, x.apac]
                .map(y => ({
                    rank: y.rank,
                    max_rank: y.max_rank,
                    season: x.season,
                    mmr: Number.parseInt(y.mmr.toFixed(2)),
                    max_mmr: Number.parseInt(y.max_mmr.toFixed(2))
                }))
                .sort(
                    (a, b) =>
                        b.max_rank != a.max_rank
                            ? b.max_rank - a.max_rank
                            : b.max_mmr - a.max_mmr
                );
            return sortedRanks[0];
        })
        .sort((a, b) => b.season - a.season);

    if (p.stats && p.stats.ranked) {
        p.stats.ranked.abandons = getAbandons(allRanks);
    }

    if (p.stats) {
        Object.assign(p.stats.general, getComputedStats(p.stats.general));
    }
    p.aliases = p.aliases
        .map(fixAlias)
        .sort((a, b) => b.created_at - a.created_at);
    p.name = p.aliases[0].name;

    // parse update variables

    let updateAvailableAt: Date;
    if (p.updateAvailableAt && p.serverTime) {
        const offset = new Date().getTime() - new Date(p.serverTime).getTime();
        const available = new Date(p.updateAvailableAt).getTime() - offset;
        updateAvailableAt = new Date(available);
    } else {
        updateAvailableAt = new Date();
    }

    // build seasonstat vars
    if (p.seasonStats) {
        p.snapshots = [{ season: -1, stats: p.stats, clean: true }].concat(
            Object.keys(p.seasonStats).map(season => {
                let next = p.seasonStats[1 + season];
                let cleanDiff = true;
                if (!next) {
                    next = p.stats;
                    cleanDiff = false;
                }
                const diff = objectDiff(
                    next,
                    p.seasonStats[season],
                    DiffStrategy.KEEP
                );

                // TODO: diff computed stats
                // hitChance
                // headshotChance
                // headshotRatio
                // abandons
                diff.general = Object.assign(
                    diff.general,
                    getComputedStats(diff.general)
                );
                diff.ranked.abandons = getAbandons([
                    allRanks.find(x => x.season == Number.parseInt(season))
                ]);

                return {
                    season: Number.parseInt(season),
                    stats: diff as IAlteredStats,
                    clean: cleanDiff
                };
            })
        );
    } else {
        p.snapshots = [
            {
                season: -1,
                stats: p.stats,
                clean: true
            }
        ];
    }

    // map operator stats
    if (p.stats.operator) {
        p.stats.operator = Object.keys(p.stats.operator)
            .map(id =>
                Object.assign({}, p.stats.operator[id], { id }, OPERATORS[id])
            )
            .reduce((acc, curr) => Object.assign(acc, { [curr.id]: curr }), {});
    }
    return Object.assign({}, p, {
        updateAvailableAt
    });
}
