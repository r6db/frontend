import * as React from "react";
import { hot } from "react-hot-loader";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import * as qrious from "qrious";
import Icon, { GLYPHS } from "components/misc/Icon";
import Page, { PageHead, PageContent } from "components/misc/Page";
import "./delete.scss";

const uuidMatch = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;

(window as any).qr = qrious;

interface IDeleteState {
    player: string | null;
    downloadURL: string;
    isChecked: boolean;
    error: string | null;
    success: string | null;
}

class Delete extends React.Component<{}, IDeleteState> {
    canvas: HTMLCanvasElement;

    constructor(props) {
        super(props);

        this.state = {
            player: null,
            downloadURL: null,
            isChecked: false,
            error: null,
            success: null
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }
    handleCheckbox() {
        this.setState({
            isChecked: !this.state.isChecked
        });
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
                downloadURL: qr.toDataURL()
            });
        } else {
            this.setState({ player: null, downloadURL: null });
        }
    }
    async check(id: string) {
        console.log(`checking rcode for player id ${id}`);
        const res = await fetch(`/api/delete/${id}`, { method: "POST" });
        if (res.status === 200) {
            const { message } = await res.json();
            this.setState({ error: null, success: message });
        } else {
            const { error } = await res.json();
            this.setState({ error, success: null });
        }
    }
    render() {
        return (
            <Page className={`delete ${this.state.player ? "delete--touched" : "delete--initial"}`}>
                <PageHead>
                    <div className="container container--small">
                        <div className="header">
                            <FormattedMessage id="delete/title" />
                        </div>
                    </div>
                </PageHead>
                <PageContent>
                    <div className="container container--small">
                        <p className="delete__intro">
                            <FormattedMessage
                                id="delete/intro"
                                values={{
                                    emphasis: (
                                        <em>We do *not* support re-adding a profile that has been blacklisted.</em>
                                    )
                                }}
                            />
                            <br />
                            <FormattedMessage id="delete/contactus" />
                        </p>
                        <FormattedMessage id="delete/step1_title">
                            {msg => (
                                <div className="delete__title">
                                    <FormattedMessage id="delete/step" values={{ step: 1 }} /> {msg}
                                </div>
                            )}
                        </FormattedMessage>

                        <div className="delete__step">
                            <p>
                                <FormattedMessage id="delete/step1_instruction" />
                            </p>
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
                                    <a
                                        download={this.state.player + ".png"}
                                        className="button button--accent"
                                        href={this.state.downloadURL}
                                    >
                                        <FormattedMessage id="delete/downloadqr" />
                                    </a>
                                ) : null}
                            </div>
                        </div>
                        {this.state.player ? (
                            <>
                                <FormattedMessage id="delete/step2_title">
                                    {msg => (
                                        <div className="delete__title">
                                            <FormattedMessage id="delete/step" values={{ step: 2 }} /> {msg}
                                        </div>
                                    )}
                                </FormattedMessage>
                                <div className="delete__step delete__postqr">
                                    <p>
                                        <FormattedMessage
                                            id="delete/step2_instruction"
                                            values={{
                                                club: (
                                                    <a href="https://club.ubisoft.com">
                                                        <FormattedMessage id="delete/club" />
                                                    </a>
                                                ),
                                                accounts: (
                                                    <a href="https://account.ubisoft.com">
                                                        <FormattedMessage id="delete/accounts" />
                                                    </a>
                                                )
                                            }}
                                        />
                                    </p>
                                </div>
                                <FormattedMessage id="delete/step3_title">
                                    {msg => (
                                        <div className="delete__title">
                                            <FormattedMessage id="delete/step" values={{ step: 3 }} /> {msg}
                                        </div>
                                    )}
                                </FormattedMessage>
                                <div className="delete__step">
                                    <p>
                                        <FormattedMessage id="delete/step3_instruction" />
                                    </p>
                                    <ul className="delete__list">
                                        <li>
                                            <FormattedHTMLMessage id="delete/step3_noreadd" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="delete/step3_fulldelete" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="delete/step3_blacklist" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="delete/step3_leaderboard" />
                                        </li>
                                    </ul>
                                    <div className="delete__check">
                                        <input
                                            type="checkbox"
                                            checked={this.state.isChecked}
                                            onChange={this.handleCheckbox}
                                        />
                                        <span>
                                            <FormattedMessage id="delete/step3_confirm" />
                                        </span>
                                    </div>
                                    <div className="delete__check">
                                        <button
                                            className="button button--red"
                                            onClick={() => this.check(this.state.player)}
                                            disabled={!this.state.isChecked}
                                        >
                                            <FormattedMessage id="delete/confirm" />
                                        </button>
                                        {this.state.error ? (
                                            <div className="delete__status error">
                                                <Icon glyph={GLYPHS.CLOSE} />{" "}
                                                <FormattedMessage
                                                    id="delete/error"
                                                    values={{
                                                        message: this.state.error
                                                    }}
                                                />
                                            </div>
                                        ) : null}
                                        {this.state.success ? (
                                            <div className="delete__status success">
                                                <Icon glyph={GLYPHS.SUCCESS} /> <FormattedMessage id="delete/success" />
                                            </div>
                                        ) : null}
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

export default hot(module)(Delete);
