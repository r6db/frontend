import * as Inferno from "inferno";
import * as Page from "components/misc/Page";

const Placeholder = () => (
    <Page.Page>
        <Page.PageHead />
        <Page.PageContent />
    </Page.Page>);

export default class AsyncComponent extends Inferno.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            Component: null,
            loading: true,
        };
        console.debug("AsyncComponent::ctor", props);
    }
    componentDidMount() {
        this.load(this.props.importFn);
    }
    componentWillUpdate(newProps) {
        if (newProps.importFn !== this.props.importFn) {
            console.debug("AsyncComponent::will_update");
            this.load(newProps.importFn);
        }
    }
    async load(importFn) {
        console.debug("AsyncComponent::load_start");
        this.setState({ loading: true, Component: <div className="asyncPlaceholder"/> });
        console.debug("AsyncComponent::load_fetch");
        let Component = <div className="asyncPlaceholder" />;

        try {
            console.debug("AsyncComponent::load_importer", {hasFunc: !!importFn});
            Component = (await importFn()).default;
            console.debug("AsyncComponent::load_success", {hasComponent: !!Component});
        } catch (e) {
            console.error(e);
            console.debug("AsyncComponent::load_fail");
        }
        this.setState({ Component, loading: false });
    }

    render() {
        if (this.state.loading || !this.state.Component) {
            return <Placeholder />;
        }
        return <this.state.Component key={this.state.Component.name} />
    }
}
