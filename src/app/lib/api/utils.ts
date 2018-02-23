import { appid } from "lib/constants";

export const failEarly = function failEarly(res) {
    if (res.status === 502) {
        throw new Error("SERVERFAULT");
    }
    if (!res.ok) {
        throw res.json();
    } else {
        return res;
    }
};

export const tap = cb => data => {
    cb(data);
    return data;
};

export const getHeaders = (headers?) => {
    const h = new Headers();

    h.append("X-App-Id", appid);

    if (headers) {
        Object.keys(headers).map(key => {
            h.append(key, headers[key]);
        });
    }

    return h;
};
