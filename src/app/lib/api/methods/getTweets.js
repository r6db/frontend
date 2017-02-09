import { v2Api, DATE_LONG } from "lib/constants";
import { failEarly, tap, getHeaders } from "../utils";
import moment from "moment";

export default function () {
    return fetch(`${v2Api}/twitter`, { headers: getHeaders() })
        .then(failEarly)
        .then(res => res.json())
        .then(tweets => tweets.map(tweet => ({
            time: moment(tweet.created_at, "ddd MMM DD HH:mm:ss Z YYYY").format(DATE_LONG),
            html: (tweet.entities.media || [])
                .concat(tweet.entities.urls ||  [])
                .reduce((acc, curr) => acc
                    .replace(curr.url, `<a href="${curr.expanded_url}">${curr.url}</a>`
                    ), tweet.text)
        })));
};