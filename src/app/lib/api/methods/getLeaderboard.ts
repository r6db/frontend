import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";
import { LeaderboardResponse } from '../../interfaces';


export default function (board, platform): Promise<LeaderboardResponse> {
    return fetch(`${v2Api}/leaderboards?stat=${board}&limit=100&platform=${platform}`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json())
        .then(entries => entries.map(entry => {
            entry.value = entry.value.toFixed(2);
            return entry;
        }));
};
