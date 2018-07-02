import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";
import handleResponse from "../handlePlayer";
import * as chunk from "lodash/chunk";
import * as flatten from "lodash/flatten";

const getPlayers = ids => {
    return fetch(`${v2Api}/players?ids=${ids.join(",")}&platform=PC`, {
        headers: getHeaders()
    })
        .then(failEarly)
        .then(res => res.json());
};

export default function(ids) {
    const proms = chunk(ids, 100).map(chunk => getPlayers(chunk));
    return Promise.all(proms)
        .then(flatten)
        .then(x => x.map(handleResponse));
}
