import m from "mithril";
import TabHeader from "./TabHeader";
import "./tabs.scss";

const isSelected = (expected, current) => expected === current;

export default {
    currentTab: null,
    oninit({attrs, state, children}) {
        // iterate over all children and create a map with their keys
        children.forEach(function (child) {
            if (!child.key) {
                throw new Error("all tab children need a set key");
            }
        });
        // select the first tab by default
        state.currentTab = children[0].key || attrs.selected;
        state.onTabSelect = key => e => {
            state.currentTab = key;
        };
    },
    view({attrs, state, children}) {
        return (
            <div className="tabs">
                <div className="tab-headers">
                    {
                        Object.keys(attrs.headers)
                            .map(key => {
                                const header = attrs.headers[key];
                                return <TabHeader key={"tabheader-" + key}
                                    header={header.label}
                                    icon={header.icon}
                                    selected={isSelected(key, state.currentTab)}
                                    onclick={state.onTabSelect(key)} />;
                            })
                    }
                </div>
                <div className="tab-content">
                    {children.filter(x => x.key === state.currentTab)}
                </div>
            </div>
        );
    }
};