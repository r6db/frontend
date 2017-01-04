import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";
import { register } from "../method";

const fixAlias = alias => {
    // eslint-disable-next-line camelcase
    alias.created_at = alias.created_at
        ? new Date(alias.created_at)
        : null;
    return alias;
};


const find = ({ id }) => fetch(`${v2Api}/players/${id}`, { headers: getHeaders() })
    .then(failEarly)
    .then(res => res.json());

const process = player => {
    player.flags = {
        noAliases: false,
        noPlaytime: false,
        noRanked: false
    };

    // check if player has aliases
    if (!player.aliases) {
        throw new Error("player object has no aliases");
        player.flaygs.noAliases = true;
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

    player.aliases = player.aliases
        .map(fixAlias)
        .sort((a, b) => b.created_at - a.created_at);
    return player;
};

register("getPlayer")
    .acquire(find)
    .process(process);
