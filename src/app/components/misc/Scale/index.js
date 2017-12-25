import * as m from "mithril";
import "./scale.scss";

const asString = val => (typeof val === "number" ? val.toFixed(2) : val.toString());

export default {
    view({ attrs, children }) {
        let type = "";
        const scale = Object.assign(
            {
                low: 0.5,
                midLow: 0.8,
                midHigh: 1.2,
                high: 1.5,
                nutty: 2.5,
            },
            attrs.scales || {},
        );
        const val = attrs.reverse ? -attrs.value : attrs.value;
        if (val == null) {
            return <span className={`scale`} />;
        }
        if (val <= attrs.neutral * scale.low) {
            type = "is-low";
        }
        if (val <= attrs.neutral * scale.midLow) {
            type = "is-med-low";
        }
        if (val > attrs.neutral * scale.midLow && attrs.value < attrs.neutral * scale.midHigh) {
            type = "is-med";
        }
        if (val >= attrs.neutral * scale.midHigh) {
            type = "is-med-high";
        }
        if (val >= attrs.neutral * scale.high) {
            type = "is-high";
        }
        if (val > attrs.neutral * scale.nutty) {
            type = "is-nutty";
        }

        return (
            <span className={`scale ${type}`}>
                {asString(attrs.value)}
                {children}
            </span>
        );
    },
};
