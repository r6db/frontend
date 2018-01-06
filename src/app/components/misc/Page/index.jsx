import * as m from "mithril";
import "./page.scss";
import background from "./RB6_WhiteNoise_Teaser1.jpg";

const PageHead = {
    view({ attrs, children }) {
        return (
            <div className="page__head">
                {attrs.image ? (
                    <img
                        style={{ "object-position": attrs.position || "50% 30%" }}
                        src={attrs.image}
                        alt=""
                        className="page__image"
                    />
                ) : null}
                <div className="page__headcontent">{children}</div>
            </div>
        );
    },
};
const PageContent = {
    view({ children }) {
        return <div className="page__content">{children}</div>;
    },
};

const Page = {
    Head: PageHead,
    Content: PageContent,
    view({ attrs, children }) {
        return (
            <div {...attrs} className={`page ${attrs.className}`}>
                {children}
            </div>
        );
    },
};

export default Page;