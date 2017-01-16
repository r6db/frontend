const { title, State } = require("./constants");


const home = {
    title: () => title,
    description: () => "R6DB is a fan-powered database for Rainbow Six: Siege PC"
};

const search = {
    title: name => `Search results for  ${name} | R6DB`,
    description: name => `Search players named ${name} on R6DB`
};

const detail = {
    title: name => `${name} | R6DB`,
    description: name => `Show player details and stats for ${name}`
};

const valueMap = {
    [State.INITIAL]: home,
    [State.SEARCH]: search,
    [State.RESULT]: search,
    [State.DETAIL]: detail
};

const setMeta = function (desc, content) {
    const id = `meta_${desc.toLowerCase()}`;
    let el = document.getElementById(id);
    const data = content || "";
    if (!el) {
        el = document.createElement("meta");
        el.description = desc;
        el.id = id;
        document.head.appendChild(el);
    }
    el.content = data;
};

export default function (meta = {}) {
    const title = meta.title
        ? `${meta.title} | R6DB`
        : "R6DB";
    
    const description = meta.description
        ? meta.description
        : "R6DB is a fan-powered database for Rainbow Six: Siege PC. Search for Players, check Profiles or view the Leaderboard";
    
    setMeta("description", description);
    setMeta("og:title", title);
    setMeta("og:image", meta.image);
    setMeta("og:type", meta.type);
    document.title = title;    
};