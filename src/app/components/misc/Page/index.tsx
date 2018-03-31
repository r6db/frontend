import * as React from "react";
import * as lozad from "lozad";
import { FadeImage } from "components/misc/FadeImage";
import "./page.scss";

export function PageHead(props) {
    return (
        <div className="page__head">
            {props.image ? (
                <img
                    className="page__image"
                    style={{
                        objectPosition: props.position || "50% 40%",
                        backgroundPosition: props.position || "50% 40%",
                        backgroundSize: "cover",
                        backgroundImage: 'url("' + props.image.placeholder + '")',
                    }}
                    src={props.image.placeholder}
                    srcSet={props.image.srcSet}
                    alt=""
                />
            ) : null}
            <div className="page__headcontent">{props.children}</div>
        </div>
    );
}
(PageHead as any).defaultHooks = {
    componentDidMount(node) {
        const observer = lozad(".fadeimage");
        setTimeout(() => observer.observe(), 200);
    },
};

export const PageContent = props => <div className="page__content">{props.children}</div>;

export const Page = props => (
    <div {...props} className={`page ${props.className || ""}`}>
        {props.children}
    </div>
);

export default Page;
