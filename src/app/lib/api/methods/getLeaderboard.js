import { v2Api } from "lib/constants";
import { set as stateSet } from "lib/appstate";
import { failEarly, getHeaders } from "../utils";


export default function (board) {
    stateSet("loading", "loading leaderboard ...");
    return fetch(`${v2Api}/leaderboards?stat=${board}&limit=100`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json())
        .then(entries => entries.map(entry => {
            entry.value = entry.value.toFixed(2);
            return entry;
        }));
};

