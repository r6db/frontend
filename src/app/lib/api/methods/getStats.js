import { v2Api } from "lib/constants";
import { failEarly, tap, getHeaders } from "../utils";

let stats = null;


export default function () {
    if (stats) {
        return Promise.resolve(stats);
    } else {
        return fetch(`${v2Api}/stats`, { headers: getHeaders() })
            .then(failEarly)
            .then(res => res.json())
            .then(tap(res => stats = res));
    }
};