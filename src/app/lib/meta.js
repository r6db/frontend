import * as constants from "./constants";


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
        : constants.title;
    
    const description = meta.description
        ? meta.description
        : constants.description;
    
    setMeta("description", description);
    setMeta("og:title", title);
    setMeta("og:image", meta.image);
    setMeta("og:type", meta.type);
    document.title = title;    
};