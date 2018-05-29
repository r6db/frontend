import * as React from "react";
import { hot } from "react-hot-loader";
import Page, { PageHead, PageContent } from "components/misc/Page";
import { GLYPHS } from "components/misc/Icon";
import Button from "components/misc/Button";
import "./demo.scss";

function Demo(props) {
    return (
        <Page>
            <PageHead>
                <div className="container">
                    <h1 className="header">Demo</h1>
                </div>
            </PageHead>
            <PageContent>
                <div className="container">
                    <section>
                        <Button label="default" />
                        <Button label="primary" type="primary" />
                        <Button label="subtle" type="accent" />
                        <Button label="error" type="error" />
                    </section>
                    <section>
                        <Button label="default" />
                        <Button label="small" size="small" />
                        <Button label="default" size="large" />
                    </section>
                    <section>
                        <Button label="default" />
                        <Button label="disabled" icon={GLYPHS.STAR} />
                        <Button label="outline" outline />
                        <Button label="disabled" disabled />
                    </section>
                </div>
            </PageContent>
        </Page>
    );
}
export default hot(module)(Demo);
