import * as m from "mithril";
import * as lozad from "lozad";
import "./page.scss";

interface IPageAttrs {
    className?: string;
}
interface IPageheadAttrs {
    position?: string;
    image?: string;
}
interface IPage extends m.Component<IPageAttrs, {}> {
    Head: m.Component<IPageheadAttrs, {}>;
    Content: m.Component<any, any>;
}
const PageHead: m.Component<IPageheadAttrs, {}> = {
    oncreate(vnode) {
        console.log("node", vnode);
        const observer = lozad(".lazyload", {
            load(el) {
                el.onload = el.setAttribute("data-created", "true");
            },
        });
        observer.observe();
    },
    view(vnode) {
        return m(".page__head", [
            vnode.attrs.image
                ? m("img.page__image.lazyload", {
                      style: { "object-position": vnode.attrs.position || "50% 30%" },
                      src: vnode.attrs.image,
                      alt: "",
                  })
                : null,
            m(".page__headcontent", vnode.children),
        ]);
    },
};
const PageContent = {
    view(vnode) {
        return m(".page__content", vnode.children);
    },
};

const Page: IPage = {
    Head: PageHead,
    Content: PageContent,
    view(vnode) {
        return m("div", { ...vnode.attrs, className: `page ${vnode.attrs.className || ""}` }, vnode.children);
    },
};

export default Page;
