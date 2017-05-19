import { v2Api } from "lib/constants";
import { set as stateSet } from "lib/appstate";
import { failEarly, getHeaders } from "../utils";

const fixAlias = alias => {
    // eslint-disable-next-line camelcase
    alias.created_at = alias.created_at
        ? new Date(alias.created_at)
        : null;
    return alias;
};


const getPlayer = id => {
    stateSet("loading", "getting data ...");
    const promises = [
        fetch(`${v2Api}/players/${id}`, { headers: getHeaders() })
            .then(failEarly)
            .then(res => res.json()),
        fetch(`${v2Api}/players/${id}/placement?stat=highest_skill_adjusted`, { headers: getHeaders() })
            .then(failEarly)
            .then(res => res.json())
            .then(function (placements) {
                const placement = placements.filter(function (placement) {
                    return placement.id === id;
                })[0];
                if (placement) {
                    return placement.rank;
                }
                return -1;
            })
            .catch(x => -1)
    ];
    return Promise.all(promises);
};

const handleResponse = data => {
    const player = data[0];
    const globalRank = data[1];

    if (!player.rank || Object.keys(player.rank).length == 0) {
        player.rank = null;
    }
    if (!player.stats || Object.keys(player.stats).length == 0) {
        player.stats = null;
    }

    stateSet("loading", "crunching data ...");
    player.flags = {
        noAliases: false,
        noPlaytime: false,
        noRanked: false
    };

    // check if player has aliases
    if (!player.aliases) {
        player.flags.noAliases = true;
        throw new Error("player object has no aliases");
    }

    // check if has playtime
    if (!player.lastPlayed || (!player.lastPlayed.casual && !player.lastPlayed.ranked)) {
        player.flags.noPlaytime = true;
    }

    // check if has rank
    const noNcsa = player.rank && player.rank.ncsa.rank === 0;
    const noApac = player.rank && player.rank.apac.rank === 0;
    const noEmea = player.rank && player.rank.emea.rank === 0;
    const noRank = noNcsa && noApac && noEmea;
    if (!player.rank || noRank) {
        player.flags.noRanked = true;
    }
    player.pastRanks = player.seasonRanks
        .concat(player.rank)
        .filter(x => !!x)
        .map(x => [x.ncsa, x.emea, x.apac]
            .map(y => ({ rank: y.max_rank, season: x.season }))
            .sort((a, b) => b.rank - a.rank)[0]);

    player.aliases = player.aliases
        .map(fixAlias)
        .sort((a, b) => b.created_at - a.created_at);
    player.name = player.aliases[0].name;
    player.globalRank = globalRank + 1;
    return player;
};

export default function (id) {
    return getPlayer(id)
        .then(handleResponse);
}
