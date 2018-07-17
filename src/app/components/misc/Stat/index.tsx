import * as React from "react";
import trim from "lib/trim";
import "./stat.scss";

interface IStatProps {
    label: string | JSX.Element;
    children: any;
    size?: "small" | "big";
}

export default class Stat extends React.PureComponent<IStatProps> {
    render() {
        return (
            <div
                className={trim(`stat
                    ${this.props.size === "big" ? "stat--big" : ""}
                `)}
            >
                <div className="stat__label">{this.props.label}</div>
                <div className="stat__value">{this.props.children}</div>
            </div>
        );
    }
}
