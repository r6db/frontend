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
                        <Button label="warning" type="warning" />
                        <Button label="success" type="success" />
                        <Button label="info" type="info" />
                    </section>
                    <section>
                        <Button label="default" outline />
                        <Button label="primary" type="primary" outline />
                        <Button label="subtle" type="accent" outline />
                        <Button label="error" type="error" outline />
                        <Button label="warning" type="warning" outline />
                        <Button label="success" type="success" outline />
                        <Button label="info" type="info" outline />
                    </section>
                    <section>
                        <Button label="default" icon={GLYPHS.STAR} />
                        <Button label="color" type="primary" icon={GLYPHS.STAR} />
                        <Button label="outline" icon={GLYPHS.STAR} outline />
                        <Button label="outline color" type="primary" icon={GLYPHS.STAR} outline />
                        <Button label="active" icon={GLYPHS.STAR} active />
                        <Button label="disabled" icon={GLYPHS.STAR} disabled />
                    </section>
                    <section>
                        <Button label="default" />
                        <Button label="small" size="small" />
                        <Button label="large" size="large" />
                    </section>
                    <section>
                        <Button label="default" />
                        <Button label="disabled" icon={GLYPHS.STAR} />
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
