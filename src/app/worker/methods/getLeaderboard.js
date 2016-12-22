import { v2Api } from "lib/constants";
import { failEarly, tap, getHeaders } from "../utils";
import { register } from "../method";

const get = function ({board, page}) {
    return fetch(`${v2Api}/leaderboards?stat=${board}&limit=100`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json());
};


const process = entries => entries.map(entry => {
    entry.value = entry.value.toFixed(2);
    return entry;
});

register("getLeaderboard")
    .acquire(get)
    .process(process);
