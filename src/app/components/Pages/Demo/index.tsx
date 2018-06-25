import * as React from "react";
import { hot } from "react-hot-loader";
import Page, { PageHead, PageContent } from "components/misc/Page";
import { GLYPHS } from "components/misc/Icon";
import Button from "components/misc/Button";
import Dropdown from "components/misc/Dropdown";
import "./demo.scss";

function Demo(props) {

    const dropdownOptions = [
        { value: "one" },
        { value: "two" },
        { value: "three" }
    ]

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
                        <Button label="primary" role="primary" />
                        <Button label="subtle" role="accent" />
                        <Button label="error" role="error" />
                        <Button label="warning" role="warning" />
                        <Button label="success" role="success" />
                        <Button label="info" role="info" />
                    </section>
                    <section>
                        <Button label="default" outline />
                        <Button label="primary" role="primary" outline />
                        <Button label="subtle" role="accent" outline />
                        <Button label="error" role="error" outline />
                        <Button label="warning" role="warning" outline />
                        <Button label="success" role="success" outline />
                        <Button label="info" role="info" outline />
                    </section>
                    <section>
                        <Button label="default" icon={GLYPHS.STAR} />
                        <Button label="color" role="primary" icon={GLYPHS.STAR} />
                        <Button label="outline" icon={GLYPHS.STAR} outline />
                        <Button label="outline color" role="primary" icon={GLYPHS.STAR} outline />
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
                    <section>
                        <Dropdown label="with label" options={dropdownOptions} />
                        <Dropdown options={dropdownOptions} />
                    </section>
                    <section>
                        <Dropdown options={dropdownOptions} />
                        <Dropdown role="primary" options={dropdownOptions} />
                        <Dropdown role="accent" options={dropdownOptions} />
                        <Dropdown role="error" options={dropdownOptions} />
                        <Dropdown role="warning" options={dropdownOptions} />
                        <Dropdown role="success" options={dropdownOptions} />
                        <Dropdown role="info" options={dropdownOptions} />
                    </section>
                    <section>
                        <Dropdown options={dropdownOptions} outline />
                        <Dropdown role="primary" options={dropdownOptions} outline />
                        <Dropdown role="accent" options={dropdownOptions} outline />
                        <Dropdown role="error" options={dropdownOptions} outline />
                        <Dropdown role="warning" options={dropdownOptions} outline />
                        <Dropdown role="success" options={dropdownOptions} outline />
                        <Dropdown role="info" options={dropdownOptions} outline />
                    </section>
                </div>
            </PageContent>
        </Page>
    );
}
export default hot(module)(Demo);
