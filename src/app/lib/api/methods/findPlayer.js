import { v2Api } from "lib/constants";
import store from "lib/store";
import { failEarly, getHeaders } from "../utils";


/*
* memoize.js
* by @philogb and @addyosmani
* with further optimizations by @mathias
* and @DmitryBaranovsk
* perf tests: http://bit.ly/q3zpG3
* Released under an MIT license.
*/
function memoize( fn ) {
    return function () {
        const args = Array.prototype.slice.call(arguments);
        let hash = "";
        let i = args.length;
        let currentArg = null;
        while (i--) {
            currentArg = args[i];
            hash += (currentArg === Object(currentArg)) ?
            JSON.stringify(currentArg) : currentArg;
            fn.memoize || (fn.memoize = {});
        }
        return (hash in fn.memoize)
            ? fn.memoize[hash]
            : fn.memoize[hash] = fn.apply(this, args);
    };
}



const timeDiff = time => new Date() - new Date(time);
const asRegex = string => {
    const res = string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        .split("")
        .map(function (char) {
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
    EXACT: 50,
    START: 20,
    PARTIAL: 10,
    REGEX: 5,
    CURRENT_MODIFIER: 2,
    LOSS_PER_SECOND: (1 / 86400) * 0.001 // 86400 is the amount of seconds in a day. we lose 0.1% value per day
};

const aliasValue = (query, current) => alias => {
    let score = 0;
    if (alias.name === query) {
        score += Values.EXACT;
    } else if (alias.name.indexOf(query) === 0) {
        score += Values.START;
    } else if (alias.name.indexOf(query) !== -1) {
        score += Values.PARTIAL;
    } else if (asRegex(query).test(alias.name)) {
        score += Values.REGEX;
    }
    if (alias.name === current) {
        score * Values.CURRENT_MODIFIER;
    }
    score * (1 - (Values.LOSS_PER_SECOND * timeDiff(alias.created_at)));
    return score;
};

const playerValue = query => memoize(player => {
    let val = player.aliases
        .map(aliasValue(query, player.name))
        .reduce((a, b) => a + b, 0);
    val = val * (1 / player.aliases.length);
    return val;
});


const fixAlias = alias => {
    // eslint-disable-next-line camelcase
    alias.created_at = alias.created_at
        ? new Date(alias.created_at)
        : null;
    return alias;
};

const processPlayer = player => {
    player.aliases = player.aliases
        .map(fixAlias)
        .sort((a, b) => b.created_at - a.created_at);
    player.name = player.aliases[0].name;
    return player;
};

const parseResponse = (name, exact) => players => {
    store.set("loading", "sorting players ...");
    const sorter = playerValue(name);
    return players
        .map(processPlayer)
        .sort((a, b) => sorter(b) - sorter(a));
};

const getUrl = (name, exact) => `${v2Api}/players?name=${name}&exact=${exact ? "1" : "0"}`;

export default function (name, exact) {
    store.set("loading", "loading results ...");
    return fetch(getUrl(name, exact), { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json())
        .then(parseResponse(name, exact));
}


