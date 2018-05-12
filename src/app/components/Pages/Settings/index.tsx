import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import Page, { PageHead, PageContent } from "components/misc/Page";
import "./settings.scss";

interface ISettingProps {
    title: string;
    description: string;
    children: React.ReactNode;
}
function Setting(props: ISettingProps) {
    return (
        <div className="setting">
            <div className="setting__head">
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
                <div className="container">
                    <div className="header">Settings</div>
                </div>
            </PageHead>
            <PageContent>
                <div className="container container--small settings__list">
                    <Setting
                        title="Analytics"
                        description="collecting anonymous browser stats allows us to optimize the site better, as well as get an overview over popular pages, etc"
                    >
                        <input
                            type="checkbox"
                            onChange={e =>
                                props.change("analytics", e.target.value)
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
