import { v2Api } from "lib/constants";
import { failEarly, tap, getHeaders } from "../utils";

export default function () {
    return fetch(`${v2Api}/twitter`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json())
        .then(tweets =>
            tweets.map(tweet => {
                const time = new Date(tweet.created_at).toLocaleString();
                const url = `https://twitter.com/Rainbow6_DB/status/${tweet.id_str}`;
                const html = (tweet.entities.media || [])
                    .concat(tweet.entities.urls || [])
                    .reduce((acc, curr) => acc
                        .replace(curr.url, `<a href="${curr.expanded_url}">${curr.url}</a>`
                    ), tweet.text);
                return { time, url, html };
            })
        );
}