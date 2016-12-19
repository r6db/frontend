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

const onlyHighest = datum => regions.reduce((acc, curr) => {
    if (!acc) {
        return Object.assign({ curr: curr, name: getRegionName(curr) }, datum[curr]);
    } else {
        const accSkill = acc.skill_mean - acc.skill_stdev;
        const currSkill = datum[curr].skill_mean - datum[curr].skill_stdev;
        if (currSkill > accSkill) {
            return Object.assign({ region: curr, name: getRegionName(curr) }, datum[curr]);
        } else {
            return acc;
        }
    }
}, null);

const process = entries => entries.map(entry => {
    entry.stats = onlyHighest(entry.stats);
    return entry;
});

register("getLeaderboard")
    .acquire(get)
    .process(process);
