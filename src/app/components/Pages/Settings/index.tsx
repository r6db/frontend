import * as React from "react";
import { hot } from "react-hot-loader";
import Page, { PageHead, PageContent } from "components/misc/Page";
import "./settings.scss";

function Settings(props) {
    return (
        <Page className="settings">
            <PageHead>
                <div className="container">
                    <div className="header">Settings</div>
                </div>
            </PageHead>
            <PageContent>
                <div className="container container--small">asd</div>
            </PageContent>
        </Page>
    );
}

export default hot(module)(Settings);
