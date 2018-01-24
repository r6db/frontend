import * as React from "react";
import * as Page from "components/misc/Page";
export default function asyncComponent(importComponent) {
    class AsyncComponent extends React.Component<any, any> {
        constructor(props) {
            super(props);

            this.state = {
                component: null,
            };
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({
                component: component,
            });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}
