import { v2Api } from "lib/constants";
import store from "lib/store";
import { failEarly, getHeaders } from "../utils";

const fixAlias = alias => {
    // eslint-disable-next-line camelcase
    alias.created_at = alias.created_at
        ? new Date(alias.created_at)
        : null;
    return alias;
};


const getPlayer = id => { 
    store.set("loading", "getting data ...");
    return fetch(`${v2Api}/players/${id}`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json());
};

const handleResponse = player => {
    store.set("loading", "crunching data ...");
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
    const noNcsa = player.rank.ncsa.rank === 0;
    const noApac = player.rank.apac.rank === 0;
    const noEmea = player.rank.emea.rank === 0;
    const noRank = noNcsa && noApac && noEmea;
    if (!player.rank || noRank) {
        player.flags.noRanked = true;    
    }
    player.pastRanks = player.seasonRanks
            .concat(player.rank)
            .map(x => [x.ncsa, x.emea, x.apac]
                .map(y => ({ rank: y.max_rank, season: x.season }))
                .sort((a, b) => b.rank - a.rank)[0]);
    
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
