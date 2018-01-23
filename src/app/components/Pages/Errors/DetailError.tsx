import Inferno from "inferno";
import { Page, PageHead, PageContent } from "components/misc/Page";
import * as rip from "./rip.jpg";

export default {
    view(vnode) {
        return (
            <Page>
                <PageHead image={rip} position="50% 40%">
                    <div className="container">
                        <h1 className="header">{vnode.attrs.title}</h1>
                    </div>
                </PageHead>
                <PageContent>
                    <div className="container">{vnode.children}</div>
                </PageContent>
            </Page>
        );
    },
};
