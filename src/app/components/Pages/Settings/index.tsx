import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import Page, { PageHead, PageContent } from "components/misc/Page";
import "./settings.scss";

interface IToggleProps {
    isChecked: boolean;
    action: any;
}
function Toggle(props: IToggleProps) {
    return (
        <div className="setting__toggle">
            <label>
                <input type="checkbox" checked={props.isChecked} onChange={props.action} />
                <div className="setting__toggle slider"></div>
            </label>
            <div className="setting__toggletext">{props.isChecked ? "ON" : "OFF"}</div>
        </div>
    );
}

interface ISettingProps {
    title: string;
    description: string;
    children: React.ReactNode;
}
function Setting(props: ISettingProps) {
    return (
        <div className="setting">
            <div className="setting__box">
                <header className="setting__title">{props.title}</header>
                <div className="setting__input">{props.children}</div>
            </div>
            <p className="setting__description">{props.description}</p>
        </div>
    );
}

interface ISettingsProps {
    analytics: boolean;
    change: (setting: string, value: string | boolean | number) => any;
}

function Settings(props: ISettingsProps) {
    return (
        <Page className="settings">
            <PageHead>
                <div className="container container--small">
                    <div className="header">Settings</div>
                </div>
            </PageHead>
            <PageContent>
                <div className="container container--small settings__list">
                    <Setting
                        title="Analytics"
                        description="Enabling this will allow us to collect anonymous data about your browser (including user-agent, your browser + version, device resolution, website size and language) to improve/optimize the experience on our site."
                    >
                        <Toggle
                            isChecked={props.analytics} 
                            action={e =>
                                props.change("analytics", e.target.checked)
                            }
                        />
                    </Setting>
                </div>
            </PageContent>
        </Page>
    );
}

const mapState = state => state.settings;
const mapDispatch = (dispatch, state) => ({
    change: (setting: string, value: string | boolean | number) =>
        dispatch({ type: "CHANGE_SETTING", payload: { setting, value } })
});

export default hot(module)(connect(mapState, mapDispatch)(Settings));
