import * as Inferno from "inferno";
import Page, { PageHead, PageContent } from "components/misc/Page";

export default function About(props) {
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
