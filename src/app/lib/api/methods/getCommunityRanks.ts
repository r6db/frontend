import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";
import { ICommunityRanks } from '../../interfaces';

export default function(platform): Promise<ICommunityRanks> {
    return fetch(`${v2Api}/community/ranks?platform=${platform}`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json());
}
