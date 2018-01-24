import * as React from "react";
import Page, { PageHead, PageContent } from "components/misc/Page";
import * as rip from "./rip.jpg";

export default function DetailError(props) {
    return (
        <Page>
            <PageHead image={rip} position="50% 40%">
                <div className="container">
                    <h1 className="header">{props.title}</h1>
                </div>
            </PageHead>
            <PageContent>
                <div className="container">{props.children}</div>
            </PageContent>
        </Page>
    );
}
