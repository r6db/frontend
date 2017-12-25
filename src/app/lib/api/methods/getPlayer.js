import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";
import handleResponse from "../handlePlayer";

const getPlayer = (id, opts) =>
    fetch(`${v2Api}/players/${id}?platform=${opts.platform}&update=${opts.update || false}`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json());

export default function(id, opts = {}) {
    return getPlayer(id, opts).then(handleResponse);
}
