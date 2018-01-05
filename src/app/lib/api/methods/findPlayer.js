import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";

/*
* memoize.js
* by @philogb and @addyosmani
* with further optimizations by @mathias
* and @DmitryBaranovsk
* perf tests: http://bit.ly/q3zpG3
* Released under an MIT license.
*/
function memoize(fn) {
    return function(...args) {
        let hash = "";
        let i = args.length;
        let currentArg = null;
        while (i--) {
            currentArg = args[i];
            hash += currentArg === Object(currentArg) ? JSON.stringify(currentArg) : currentArg;
            fn.memoize || (fn.memoize = {});
        }
        return hash in fn.memoize ? fn.memoize[hash] : (fn.memoize[hash] = fn.apply(this, args));
    };
}

const asRegex = string => {
    const res = string
        .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        .split("")
        .map(function(char) {
            switch (char.toLowerCase()) {
                case "i":
                case "l":
                case "1":
                    return "[Il1]";
                case "O":
                case "0":
                    return "[O0]";
                default:
                    return char;
            }
        })
        .join("");
    return new RegExp(res, "i");
};

const Values = {
    EXACT: 100,
    START: 40,
    PARTIAL: 20,
    REGEX: 10,
    CURRENT_MODIFIER: 5,
};

const aliasValue = (query, current) => alias => {
    let score = 0;
    const normQuery = query.toLowerCase();
    const normAlias = alias.name.toLowerCase();
    const normCurrent = current.toLowerCase();
    if (normAlias === normQuery) {
        score += Values.EXACT;
    } else if (normAlias.indexOf(normQuery) === 0) {
        score += Values.START;
    } else if (normAlias.indexOf(normQuery) !== -1) {
        score += Values.PARTIAL;
    } else if (asRegex(normQuery).test(normAlias)) {
        score += Values.REGEX;
    }
    if (normAlias === normCurrent) {
        score = score * Values.CURRENT_MODIFIER;
    }
    return score;
};

const playerValue = query =>
    memoize(player => player.aliases.map(aliasValue(query, player.name)).reduce((a, b) => a + b, 0));

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
    const sorter = playerValue(name);
    const res = players
        .filter(x => x.aliases && x.aliases.length)
        .map(processPlayer(platform))
        .sort((a, b) => sorter(b) - sorter(a));
    return res;
};

const getUrl = (name, platform) => `${v2Api}/players?name=${name}&platform=${platform}`;

export default function(name, platform) {
    return fetch(getUrl(name, platform), { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json())
        .then(parseResponse(name, platform));
}
