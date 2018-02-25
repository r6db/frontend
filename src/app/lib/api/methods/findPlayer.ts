import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";

const fixAlias = alias => {
    // eslint-disable-next-line camelcase
    alias.created_at = alias.created_at ? new Date(alias.created_at) : null;
    return alias;
};

const processPlayer = platform => player => {
    player.platform = platform;
    player.aliases = player.aliases.map(fixAlias).sort((a, b) => b.created_at - a.created_at);
    player.name = player.aliases[0].name;
    return player;
};

const parseResponse = (name, platform) => players => {
    const res = players
        .filter(x => x.aliases && x.aliases.length)
        .map(processPlayer(platform))
    return res;
};

const getUrl = (name, platform) => `${v2Api}/players?name=${name}&platform=${platform}`;

export default function(name, platform) {
    return fetch(getUrl(name, platform), { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json())
        .then(parseResponse(name, platform));
}
