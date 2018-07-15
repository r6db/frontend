import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";
import handleResponse from "../handlePlayer";
import { IPlayerResponse, IAlteredPlayer } from '../../interfaces';

const getPlayer = (id, opts): Promise<IPlayerResponse> =>
    fetch(`${v2Api}/players/${id}?platform=${opts.platform}&update=${opts.update || false}`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json());

export default function(id, opts = {}): Promise<IAlteredPlayer> {
    return getPlayer(id, opts).then(handleResponse);
}
