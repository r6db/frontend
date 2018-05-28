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
                    <span>
                        We use cookies to on this site. check our{" "}
                        <a href="/privacy">privacy policy</a> for details. By continuing to use this
                        website, you agree to the usage of cookies.
                    </span>
                    <button onClick={this.accept} className="button button--primary">
                        Accept
                    </button>
                </div>
            </div>
        );
    }
}

export default hot(module)(Cookiebanner);
