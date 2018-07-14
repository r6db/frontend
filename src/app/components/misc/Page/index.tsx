import * as React from "react";
import "./page.scss";

export function PageHead(props) {
    return (
        <div className="page__head">
            {props.image ? (
                <img
                    className="page__image"
                    style={{
                        opacity: props.opacity || "0.35",
                        objectPosition: props.position || "50% 40%",
                        backgroundPosition: props.position || "50% 40%",
                        backgroundSize: "cover",
                        backgroundImage:
                            "url(" + props.image.placeholder + ")"
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

export const PageContent = props => (
    <div className="page__content">{props.children}</div>
);

export const Page = props => (
    <div {...props} className={`page ${props.className || ""}`}>
        {props.children}
    </div>
);

export default Page;
