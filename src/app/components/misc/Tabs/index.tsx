import * as React from "react";
import "./tabs.scss";

const TabHeader = props => (
    <div className={`tabs__header ${props.selected ? "tabs__header--selected" : ""}`} onClick={props.onclick}>
        {props.header}
    </div>
);

const isSelected = (expected, current) => expected === current;

export default class Tabs extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: null,
        };
    }
    onTabSelect(key) {
        return e => this.setState({ currentTab: key });
    }
    render() {
        return (
            <div className="tabs">
                <div className="tabs__headers">
                    {Object.keys(this.props.headers).map(key => {
                        const header = this.props.headers[key];
                        return (
                            <TabHeader
                                key={"tabheader--" + key}
                                header={header.label}
                                icon={header.icon}
                                selected={isSelected(key, this.state.currentTab)}
                                onClick={this.onTabSelect(key)}
                            />
                        );
                    })}
                </div>
                <div className="tabs__content">{this.props.children}</div>
            </div>
        );
    }
}
