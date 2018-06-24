import * as React from "react";
import { hot } from "react-hot-loader";
import trim from "lib/trim";
import Icon, { GLYPHS } from "components/misc/Icon";

import "./dropdown.scss";

interface IDropdownProps
    extends React.DetailedHTMLProps<
            React.SelectHTMLAttributes<HTMLSelectElement>,
            HTMLSelectElement
        > {
    options: Array<string | number>;
    label?: string;
    role?: "primary" | "accent" | "error" | "warning" | "success" | "info";
    outline?: boolean;
    action?(any): any;
}

interface IDropdownState {
    value: number | string;
}

class Dropdown extends React.PureComponent<IDropdownProps, IDropdownState> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.action(e.target.value);
    }
    render() {
        return (
            <div
                className={trim(`dropdown
                    dropdown--${this.props.outline ? "outline--" : ""}${this.props.role || "default"}
                    ${this.props.disabled ? "dropdown--disabled" : ""}
                `)}
            >
                {this.props.label ? <label>{this.props.label}</label> : ""}
                <div className="dropdown__box">
                    <select
                        value={this.props.value}
                        onChange={this.handleChange}
                        disabled={this.props.disabled}
                    >
                        {this.props.options.map(x => {
                            return (
                                <option value={x} key={x}>
                                    {x}
                                </option>
                            );
                        })}
                    </select>
                    <Icon className="dropdown__arrow" glyph={GLYPHS.CHEVRONDOWN} />
                </div>
            </div>
        );
    }
}

export default hot(module)(Dropdown);
