import Inferno from "inferno";
import * as lozad from "lozad";
import { FadeImage } from "components/misc/FadeImage";
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
export const PageHead: m.Component<IPageheadAttrs, {}> = {
    oncreate(vnode) {
        const observer = lozad(".fadeimage");
        setTimeout(() => observer.observe(), 200);
    },
    view(vnode) {
        return m(".page__head", [
            vnode.attrs.image
            ? m(FadeImage, {
                className: "page__image",
                style: { "object-position": vnode.attrs.position || "50% 30%" },
                src: vnode.attrs.image,
                alt: ""
            })
            : null,
            m(".page__headcontent", vnode.children)
        ]);
    }
};
export const PageContent = {
    view(vnode) {
        return m(".page__content", vnode.children);
    }
};

export const Page: IPage = {
    Head: PageHead,
    Content: PageContent,
    view(vnode) {
        return m(
            "div",
            { ...vnode.attrs, className: `page ${vnode.attrs.className || ""}` },
            vnode.children
        );
    }
};

export default Page;
