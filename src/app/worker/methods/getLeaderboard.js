import { v2Api } from "lib/constants";
import { failEarly, tap, getHeaders } from "../utils";
import { register } from "../method";
import { regions, getRegionName } from "lib/region";

let stats = null;

const get = function ({board, page}) {
    if (stats) {
        return Promise.resolve(stats);
    } else {
        return fetch(`${v2Api}/leaderboards?stat=${board}&limit=100&page=${page}`, { headers: getHeaders() })
            .then(failEarly)
            .then(res => res.json())
            .then(tap(res => stats = res));
    }
};


const process = entries => entries.map(entry => {
    entry.value = entry.value.toFixed(2);
    return entry;
});

register("getLeaderboard")
    .acquire(get)
    .process(process);
