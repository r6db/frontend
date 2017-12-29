import * as m from "mithril";
import "./page.scss";

const PageHead = {
    view({ attrs, children }) {
        return (
            <div className="page__head">
                <img
                    style={{ top: attrs.top || "-200px", left: attrs.top || 0 }}
                    src={attrs.image || "/assets/tower_1.jpg"}
                    alt=""
                    className="page__image"
                />
                {children}
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
