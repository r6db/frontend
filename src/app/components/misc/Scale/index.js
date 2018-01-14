import * as m from "mithril";
import "./scale.scss";

const asString = val => (typeof val === "number" ? val.toFixed(2) : val.toString());

const defaultScale = {
    low: 0.5,
    "med-low": 0.8,
    "med-high": 1.2,
    high: 1.5,
    nutty: 2.5,
};

const kdScale = {
    low: 0.5,
    "med-low": 0.8,
    "med-high": 1.3,
    high: 1.9,
    nutty: 2.5,
};
const kdaScale = {
    low: 0.8,
    "med-low": 1.2,
    "med-high": 1.9,
    high: 2.4,
    nutty: 3,
};

const winlossScale = {
    low: 35,
    "med-low": 45,
    "med-high": 55,
    high: 65,
    nutty: 75,
};

const headshotScale = {
    low: 15,
    "med-low": 25,
    "med-high": 35,
    high: 45,
    nutty: 55,
};

const kprScale = {
    low: 0.2,
    "med-low": 0.7,
    "med-high": 1,
    high: 1.3,
    nutty: 1.6,
};
const survivalScale = {
    low: 15,
    "med-low": 25,
    "med-high": 35,
    high: 45,
    nutty: 55,
};
export const SCALES = {
    DEFAULT: defaultScale,
    KD: kdScale,
    KDA: kdaScale,
    WL: winlossScale,
    KPR: kprScale,
    SVL: survivalScale,
    HS: headshotScale,
};
export default {
    view({ attrs, children }) {
        const scale = attrs.scale || defaultScale;
        const val = attrs.reverse ? -attrs.value : attrs.value;

        const scaleEntries = Object.keys(scale).map(key => ({ key, value: scale[key] }));

        const type = "scale--" + scaleEntries.reduce((acc, curr) => (val > curr.value ? curr.key : acc), "low");

        if (val == null) {
            return <span className={`scale`} />;
        }

        return (
            <span className={`scale ${type}`}>
                {asString(attrs.value)}
                {children}
            </span>
        );
    },
};
