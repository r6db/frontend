import { v2Api } from "lib/constants";
import { failEarly, getHeaders } from "../utils";

export default function(platform) {
    return fetch(`${v2Api}/community/ranks?platform=${platform}`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json());
}
