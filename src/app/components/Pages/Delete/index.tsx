import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import * as qrious from "qrious";
import Page, { PageHead, PageContent } from "components/misc/Page";
import "./delete.scss";

const uuidMatch = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;

(window as any).qr = qrious;

interface IDeleteState {
    player: string | null;
}

class Delete extends React.Component<{}, IDeleteState> {
    canvas: HTMLCanvasElement;

    constructor(props) {
        super(props);

        this.state = {
            player: null
        };
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e) {
        if (e.target.value && e.target.validity.valid) {
            this._handleInput(e.target.value.toString());
        } else {
            this.setState({ player: null });
        }
    }
    _handleInput(url) {
        console.log("url", url);
        const match = url.match(uuidMatch);
        const id = match ? match[0] : null;
        console.log("id", id);
        if (id) {
            const qr = new qrious({
                element: this.canvas,
                value: id
            });
            qr.set({
                background: "white",
                foreground: "black",
                size: 500
            });
            this.setState({
                player: id
            });
        } else {
            this.setState({ player: null });
        }
    }
    check(id: string) {
        console.log(`checking rcode for player id ${id}`);
        // todo: add xhr when server is prepped
    }
    render() {
        return (
            <Page
                className={`delete ${
                    this.state.player ? "delete--touched" : "delete--initial"
                }`}
            >
                <PageHead>
                    <div className="container">
                        <div className="header">Delete Account</div>
                    </div>
                </PageHead>
                <PageContent>
                    <div className="container container--small">
                        <p className="delete__intro">
                            We need to make sure that only the account owner can
                            delete his data. <br />
                            Please follow the steps below to validate ownership
                            and trigger deletion.
                        </p>
                        <div className="delete__step">
                            <p>1. enter the link to your r6db profile</p>
                            <input
                                type="text"
                                onChange={this.handleInput}
                                placeholder="https://r6db.com/player/00000000-0000-0000-0000-000000000000"
                                pattern="https:\/\/r6db\.com\/player\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}"
                                className="delete__input"
                            />
                        </div>
                        <canvas ref={el => (this.canvas = el)} />
                        {this.state.player ? (
                            <>
                                <p className="delete__step delete__postqr">
                                    2. Please change your uplay avatar to the qr
                                    code shown above. You can do this by
                                    visiting the{" "}
                                    <a href="https://club.ubisoft.com">
                                        Ubisoft Club
                                    </a>. After that, please click the button
                                    below. Once the code is validated, the
                                    server will delete the profile and blacklist
                                    it from re-indexing.
                                </p>
                                <p className="delete__step">
                                    3. check the code:
                                    <button
                                        className="button button--accent  delete__check"
                                        onClick={() =>
                                            this.check(this.state.player)
                                        }
                                    >
                                        check
                                    </button>
                                </p>
                            </>
                        ) : null}
                    </div>
                </PageContent>
            </Page>
        );
    }
}

const mapState = state => state.settings;
const mapDispatch = (dispatch, state) => ({
    change: (setting: string, value: string | boolean | number) =>
        dispatch({ type: "CHANGE_SETTING", payload: { setting, value } })
});

export default hot(module)(Delete);
