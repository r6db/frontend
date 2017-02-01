import fetch from "isomorphic-fetch";

const knownIds = ["1b50085a-8a20-4ce6-b75f-db6a00e4d718", "532dae03-7c7f-42a1-89d4-f5bbd8f67573"];

const request = (t, url) => fetch(`https://r6db.com/api/${url}`, {
    headers: { "x-app-id": "r6db-apitest" }
})
.then(res => res.json())
.catch(err => t.fail(err));

describe("search api", function () {
    it("can find players", t => {
        request(t, "v2/players?name=Laxis")
            .then(data => {
                expect(data.length).toBeGreaterThanOrEqual(2);
                expect(data.map(x => x.id))
                    .toEqual(expect.arrayContaining(knownIds));
                t();
            })
            .catch(err => t.fail(err));
    });
    it("can find exact matches", t => {
        request(t, "v2/players?name=NaCleptic&exact=true")
            .then(data => {
                expect(data.length).toBeGreaterThanOrEqual(2);
                expect(data.map(x => x.id))
                    .toEqual(expect.arrayContaining(knownIds));
                t();
            });
    });
});