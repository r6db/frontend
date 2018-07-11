import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";
import { ISearchResponseProfile, Platform, ISearchResponseProfileAlias, ISearchProfileAlias, ISearchProfile } from '../../interfaces';

const fixAlias = (alias: ISearchResponseProfileAlias): ISearchProfileAlias => {
    // eslint-disable-next-line camelcase
    alias.created_at = alias.created_at ? new Date(alias.created_at) : null;
    return Object.assign({}, alias, {
        created_at: alias.created_at ? new Date(alias.created_at) : null
    });
};

const aliasSort = (a: ISearchProfileAlias, b: ISearchProfileAlias): number => {
    const aValue = a.created_at ? a.created_at.getTime() : 0;
    const bValue = b.created_at ? b.created_at.getTime() : 0;
    return bValue - aValue;
};

const processPlayer = (platform: Platform) => (player: ISearchResponseProfile): ISearchProfile => {
    return Object.assign({}, player, {
        platform,
        aliases: player.aliases.map(fixAlias).sort(aliasSort),
        name: player.aliases[0].name
    });
};

const parseResponse = (name, platform) => (players: ISearchResponseProfile[]) => {
    const res = players
        .filter(x => x.aliases && x.aliases.length)
        .map(processPlayer(platform))
    return res;
};

const getUrl = (name: string, platform: Platform) => `${v2Api}/players?name=${name}&platform=${platform}`;

export default function(name, platform) {
    return (fetch(getUrl(name, platform), { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json()) as Promise<ISearchResponseProfile[]>)
        .then(parseResponse(name, platform));
}
