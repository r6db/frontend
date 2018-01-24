import * as Inferno from "inferno";
import * as Page from "components/misc/Page";

export default class AsyncComponent extends Inferno.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            Component: null,
            currentImport: null,
            loading: false,
        };
    }
    componentDidMount() {
        this.load(this.props.importFn);
    }
    async load(importFn) {
        console.log("AsyncComponent::start");
        this.setState({ loading: true });
        console.log("AsyncComponent::fetch");
        try {
            console.log("AsyncComponent::importer", importFn);
            const imported = await importFn();
            console.log("AsyncComponent::success");
            const Component = imported.default;
            this.setState({ Component, loading: false });
        } catch (e) {
            console.error(e);
            console.log("AsyncComponent::fail");
            this.setState({ Component: null, loading: false });
        }
    }

    componentWillUpdate(old) {
        if (!this.props.loading && this.props.importFn !== this.state.currentImport) {
            console.log("AsyncComponent::will_update");
            this.setState({ currentImport: this.props.importFn });
            this.load(this.props.importFn);
        }
    }
    render() {
        return this.state.loading || !this.state.Component ? (
            <Page.Page>
                <Page.PageHead />
                <Page.PageContent />
            </Page.Page>
        ) : (
            <this.state.Component {...this.props} />
        );
    }
}
