import * as Inferno from "inferno";
import * as lozad from "lozad";
import { FadeImage } from "components/misc/FadeImage";
import "./page.scss";

export function PageHead(props) {
    return (
        <div className="page__head">
            {props.image ? (
                <FadeImage
                    className="page__image fadeimage"
                    src={props.image}
                    style={{ "object-position": props.position || "50% 30%" }}
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
    <div className={`page ${props.className || ""}`}>
        {props.children}
    </div>
);

export default Page;
