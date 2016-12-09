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
    if (!player.aliases) {
        throw new Error("player object has no aliases");
    }
    player.aliases = player.aliases
        .map(fixAlias)
        .sort((a, b) => b.created_at - a.created_at);
    return player;
};

register("getPlayer")
    .acquire(find)
    .process(process);
