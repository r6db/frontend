import * as m from "mithril";
import "./fadeimage.scss";

const onload = e => {
    e.currentTarget.classList.add("fadeimage--loaded");
}

export const FadeImage: m.Component<any, any> = {
    view({ attrs }) {
        return m("img.fadeimage", {
            ...attrs,
            onload,
        })
    }
}