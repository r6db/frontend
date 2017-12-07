import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";
import handleResponse from "../handlePlayer";

const getPlayers = ids => {
    return fetch(`${v2Api}/players?ids=${ids.join(",")}`, {
        headers: getHeaders(),
    })
        .then(failEarly)
        .then(res => res.json());
};

export default function(id) {
    return getPlayers(id).then(x => x.map(handleResponse));
}
