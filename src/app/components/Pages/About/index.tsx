import * as React from "react";
import { hot } from "react-hot-loader";
import Page, { PageHead, PageContent } from "components/misc/Page";

function About(props) {
    return (
        <Page>
            <PageHead>
                <div className="container">
                    <h1 className="header">About</h1>
                </div>
            </PageHead>
            <PageContent />
        </Page>
    );
}
export default hot(module)(About);