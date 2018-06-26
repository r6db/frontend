import * as React from "react";
import { hot } from "react-hot-loader";
import Icon, { GLYPHS } from "../Icon";
import trim from "lib/trim";

import "./alert.scss";

interface IAlertProps {
    role?: "primary" | "accent" | "error" | "warning" | "success" | "info";
    isOpen?: boolean;
    isCloseable?: boolean;
}

interface IAlertState {
    isOpen: boolean;
}

class Alert extends React.PureComponent<IAlertProps, IAlertState> {
    public static defaultProps: Partial<IAlertProps> = {
        isOpen: true
    };

    constructor(props) {
        super(props);
        this.state = { isOpen: this.props.isOpen };
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss(e) {
        this.setState({
            isOpen: false
        });
    }
    render() {
        return (
            <div
                className={trim(`alert
                alert--${this.props.role || "default"}
                ${this.state.isOpen ? "alert--open" : ""}
            `)}
            >
                <div className="alert__content">{this.props.children}</div>
                {this.props.isCloseable ? (
                    <button
                        className="alert__close"
                        onClick={this.handleDismiss}
                    >
                        <Icon glyph={GLYPHS.CLOSE} />
                    </button>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
export default hot(module)(Alert);
