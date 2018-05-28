import * as React from "react";
import { hot } from "react-hot-loader";
import "./cookiebanner.scss";

interface ICookiebannerState {
    hasAccepted: boolean;
}

class Cookiebanner extends React.Component<{}, ICookiebannerState> {
    constructor(props) {
        super(props);
        this.state = {
            hasAccepted: !!localStorage.getItem("cookiesAccepted")
        };
        this.accept = this.accept.bind(this);
    }
    accept() {
        localStorage.setItem("cookiesAccepted", "true");
        this.setState({
            hasAccepted: !!localStorage.getItem("cookiesAccepted")
        });
    }

    render() {
        if (this.state.hasAccepted) {
            return null;
        }
        return (
            <div className="cookiebanner">
                <div className="cookiebanner__container">
                    <p>
                        This website uses cookies to ensure you get the best experience on our website.
                        <span className="cookiebanner__subtle">By continuing to use this website or by clicking "Accept", you agree to the usage of cookies on this device. <a href="/privacy">Cookie policy</a></span>
                    </p>
                    <button onClick={this.accept} className="button button--primary">
                        Accept
                    </button>
                </div>
            </div>
        );
    }
}

export default hot(module)(Cookiebanner);
