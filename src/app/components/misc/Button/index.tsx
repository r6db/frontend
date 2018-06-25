import * as React from "react";
import { hot } from "react-hot-loader";
import Icon from "../Icon";
import trim from "lib/trim";
import "./button.scss";

interface IButtonProps
    extends React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        > {
    label: string;
    icon?: any;
    role?: "primary" | "accent" | "error" | "warning" | "success" | "info" ;
    size?: "small" | "large";
    outline?: boolean;
    active?: boolean;
}

class Button extends React.PureComponent<IButtonProps, {}> {
    render() {
        return (
            <button
                disabled={this.props.disabled}
                onClick={this.props.onClick}
                className={trim(`button
                    button--${this.props.size || "default"}
                    button--${this.props.outline ? "outline--" : ""}${this.props.role || "default"}
                    ${this.props.disabled ? "button--disabled" : ""}
                    ${this.props.icon ? "button--iconed" : ""}
                    ${this.props.active ? "button--active" : ""}
                `)}
            >
                {this.props.icon ? <Icon className="button__icon" glyph={this.props.icon} /> : null}
                <span className="button__label">{this.props.label}</span>
            </button>
        );
    }
}

export default hot(module)(Button);
