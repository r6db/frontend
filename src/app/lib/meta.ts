import * as constants from "./constants";

const setMeta = function(desc, content) {
    const id = `meta_${desc.toLowerCase()}`;
    let el = document.getElementById(id) as HTMLMetaElement;
    const data = content || "";
    if (!el) {
        el = document.createElement("meta");
        (el as any).description = desc;
        el.id = id;
        document.head.appendChild(el);
    }
    el.content = data;
};

interface IMetaOptions {
    title?: string;
    description?: string;
}

export default function(meta: IMetaOptions = {}) {
    const title = meta.title ? `${meta.title} | R6DB` : constants.title;

    const description = meta.description ? meta.description : constants.description;

    setMeta("description", description);
    setMeta("og:title", title);
    document.title = title;
}
