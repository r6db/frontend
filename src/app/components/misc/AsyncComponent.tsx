import * as Inferno from "inferno";
import * as Page from "components/misc/Page";

export default class AsyncComponent extends Inferno.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            Component: null,
            importFn: null,
        };
        this.load(props.importFN);
    }
    async load(importFn) {
        if (importFn === this.state.importFn) {
            return null;
        }
        try {
            const module = await importFn();
            const Component = module.default;
            this.setState({ importFn, Component });
        } catch (e) {
            this.setState({ Component: null, importFn: null });
        }
    }

    componentDidUpdate(oldProps, newProps) {
        this.load(newProps.importFn);
    }
    render() {
        return this.state.Component ? (
            <this.state.Component {...this.props} />
        ) : (
            <Page.Page>
                <Page.PageHead />
                <Page.PageContent />
            </Page.Page>
        );
    }
}
