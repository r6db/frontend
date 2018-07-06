import { v2Api, v3Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";
import handleResponse from "../handlePlayer";

const getPlayer = (id, opts) =>
    fetch(
        `${v2Api}/players/${id}?platform=${
            opts.platform
        }&update=${opts.update || false}`,
        { headers: getHeaders() }
    )
        .then(failEarly)
        .then(res => res.json());

const getSeasonstats = id =>
    fetch(`${v3Api}/player/${id}/seasonstats`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json());

export default async function(id, opts = {}) {
    const player = await getPlayer(id, opts);
    const seasonStats = await getSeasonstats(id);
    player.seasonStats = seasonStats.data[id];
    return handleResponse(player);
}
