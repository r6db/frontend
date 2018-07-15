import { v2Api, v3Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";
import handleResponse from "../handlePlayer";
import { IPlayerResponse, IAlteredPlayer } from "../../interfaces";

const getPlayer = (id: string, opts: { update?: boolean; platform: string }) =>
    fetch(
        `${v2Api}/players/${id}?platform=${
            opts.platform
        }&update=${opts.update || false}`,
        { headers: getHeaders() }
    )
        .then(failEarly)
        .then(res => res.json() as IPlayerResponse);

const getSeasonstats = id =>
    fetch(`${v3Api}/player/${id}/seasonstats`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json());

export default async function(id, opts): Promise<IAlteredPlayer> {
    const player = await getPlayer(id, opts);
    const seasonStats = await getSeasonstats(id);
    player.seasonStats = seasonStats.data[id];
    return handleResponse(player);
}
