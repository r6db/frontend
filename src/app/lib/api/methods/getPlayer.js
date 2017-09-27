import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";

const earliestDate = new Date("2015-01-01");
const fixAlias = alias => {
    // eslint-disable-next-line camelcase
    const d = new Date(alias.created_at);
    alias.created_at = alias.created_at && d > earliestDate
        ? d
        : null;
    return alias;
};


const getPlayer = id => {
    return fetch(`${v2Api}/players/${id}`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json());
};

const handleResponse = player => {
    if (!player.rank || Object.keys(player.rank).length == 0) {
        player.rank = null;
    }
    if (!player.stats || Object.keys(player.stats).length == 0) {
        player.stats = null;
    }

    player.flags = {
        noAliases: !player.aliases || !player.aliases.length,
        noPlaytime: (!player.lastPlayed || (!player.lastPlayed.casual && !player.lastPlayed.ranked))
    };

    const allRanks = player.seasonRanks
        .concat(player.rank)
        .filter(x => !!x)
        .reduce((acc, rank) => {
            let alreadyHasSeason = !!acc.filter(x => x.season === rank.season).length;
            if (!alreadyHasSeason) {
                acc.push(rank);
            }
            return acc;
        }, []);

    player.pastRanks = allRanks.map(x => {
        return [x.ncsa, x.emea, x.apac]
            .map(y => ({ rank: y.max_rank, season: x.season, mmr: y.max_mmr.toFixed(2) }))
            .sort((a, b) => b.rank != a.rank
                ? b.rank - a.rank
                : b.mmr - a.mmr
            )[0]
    })
    .sort((a, b) => b.season - a.season);

    const sum = (x, y) => x + y;

    if (player.stats && player.stats.ranked) {
        player.stats.ranked.abandons = allRanks.map(x => [x.ncsa, x.emea, x.apac]
                .map(y => y.abandons)
                .reduce(sum, 0))
            .reduce(sum, 0);
    }

    if (player.stats) {
        player.stats.general.hitChance = ((player.stats.general.bulletsHit * 100) / (player.stats.general.bulletsFired || 1))
        player.stats.general.headshotChance = ((player.stats.general.headshot * 100) / (player.stats.general.bulletsHit || 1))
        player.stats.general.headshotRatio = ((player.stats.general.headshot * 100) / (player.stats.general.kills || 1))

    }
    player.aliases = player.aliases
        .map(fixAlias)
        .sort((a, b) => b.created_at - a.created_at);
    player.name = player.aliases[0].name;
    return player;
};

export default function (id) {
    return getPlayer(id)
        .then(handleResponse);
}
