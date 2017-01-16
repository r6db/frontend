import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";


export default function (board) {
    return fetch(`${v2Api}/leaderboards?stat=${board}&limit=100`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json())
        .then(entries => entries.map(entry => {
            entry.value = entry.value.toFixed(2);
            return entry;
        }));
};

