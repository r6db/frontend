import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import * as qrious from "qrious";
import Icon, { GLYPHS } from "components/misc/Icon";
import Page, { PageHead, PageContent } from "components/misc/Page";
import "./delete.scss";

const uuidMatch = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;

(window as any).qr = qrious;

interface IDeleteState {
    player: string | null;
    downloadURL: string;
}

class Delete extends React.Component<{}, IDeleteState> {
    canvas: HTMLCanvasElement;

    constructor(props) {
        super(props);

        this.state = {
            player: null,
            downloadURL: null
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
                player: id,
                downloadURL: qr.toDataURL(),
            });
        } else {
            this.setState({ player: null, downloadURL: null });
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
                    <div className="container container--small">
                        <div className="header">Delete Account</div>
                    </div>
                </PageHead>
                <PageContent>
                    <div className="container container--small">
                        <p className="delete__intro">
                            We need to make sure that only the account owner can
                            delete his data. Please follow the steps below to
                            validate ownership and trigger deletion. Do note,
                            that the deletion process is final and irreversible.
                            <em>
                                We do *not* support re-adding a profile that has
                                been blacklisted.
                            </em>
                        </p>
                        <div className="delete__title"><span>Step 1</span> Enter the link to your R6DB profile</div>
                        <div className="delete__step">
                            <p>To start the deletion progress, please enter your full R6DB profile URL down below.</p>
                            <input
                                type="text"
                                onChange={this.handleInput}
                                placeholder="https://r6db.com/player/00000000-0000-0000-0000-000000000000"
                                pattern="https:\/\/r6db\.com\/player\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}"
                                className="delete__input"
                            />
                            <div className="delete__qrcode">
                                <canvas ref={el => (this.canvas = el)} />
                                {this.state.player ? (  
                                    <a  download={this.state.player}
                                        className="button button--accent"
                                        href={this.state.downloadURL}                      
                                    >
                                        Download QR Code
                                    </a> 
                                ) : null }
                            </div>
                        </div>
                        {this.state.player ? (
                            <>
                                <div className="delete__title"><span>Step 2</span> Change your UPlay avatar to the QR Code above</div>
                                <div className="delete__step delete__postqr">
                                    <p>You can do this by
                                    visiting the{" "}
                                    <a href="https://club.ubisoft.com">
                                        Ubisoft Club
                                    </a>. Console users might need to connect
                                    their account on the{" "}
                                    <a href="https://account.ubisoft.com">
                                        Ubisoft Accounts
                                    </a>{" "}
                                    page first.</p>
                                </div>
                                <div className="delete__title"><span>Step 3</span> Verify your account</div>
                                <div className="delete__step">
                                    <p>Click the button down below if you have changed your avatar to the QR code and to verify that the account belongs to you.</p>
                                    <div className="delete__check">
                                        <button
                                            className="button button--accent"
                                            onClick={() =>
                                                this.check(this.state.player)
                                            }
                                        >
                                            Check for changes
                                        </button>
                                        <div className="delete__status success"><Icon glyph={GLYPHS.SUCCESS} /> Success</div>
                                        {/* <div className="delete__status error"><Icon glyph={GLYPHS.CLOSE} /> Error</div> */}
                                    </div>
                                </div>
                                <div className="delete__title"><span>Step 4</span> Confirm deletion of your account</div>
                                <div className="delete__step">
                                <p>After you click the button below, your account will be deleted from our servers and will be added to a blacklist
                                   to disable future fetching of data. This step is irreversible and final so proceed with caution.</p>                  
                                    <div className="delete__check">
                                        <button
                                            className="button button--red"
                                            >
                                                Confirm deletion
                                        </button>
                                        <div className="delete__status error"><Icon glyph={GLYPHS.CLOSE} /> Error</div>
                                    </div>
                                </div>
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
