import * as m from "mithril";
import "./scale.scss";

const asString = val => (typeof val === "number" ? val.toFixed(2) : val.toString());

const defaultScale = {
    "med-low": 0.8,
    med: 1,
    "med-high": 1.2,
    high: 1.5,
    nutty: 2.5,
};

const kdScale = {
    "med-low": 0.8,
    med: 1,
    "med-high": 1.3,
    high: 1.9,
    nutty: 2.5,
};
const kdaScale = {
    "med-low": 1.2,
    med: 1.6,
    "med-high": 1.9,
    high: 2.4,
    nutty: 3,
};

const winlossScale = {
    "med-low": 45,
    med: 50,
    "med-high": 55,
    high: 65,
    nutty: 75,
};

const headshotScale = {
    "med-low": 25,
    med: 35,
    "med-high": 45,
    high: 55,
    nutty: 60,
};

const kprScale = {
    "med-low": 0.5,
    med: 0.7,
    "med-high": 0.9,
    high: 1.1,
    nutty: 1.3,
};
const survivalScale = {
    "med-low": 3,
    med: 0.4,
    "med-high": 0.5,
    high: 0.55,
    nutty: 0.6,
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

        // grab the matching scale key from our definitions
        const type = Object.keys(scale)
            .map(key => ({ key, value: scale[key] }))
            .reduce((acc, curr) => (val > curr.value ? curr.key : acc), "low");

        if (val == null) {
            return <span className={`scale`} />;
        }

        return (
            <span className={`scale scale--${type}`}>
                {asString(attrs.value)}
                {children}
            </span>
        );
    },
};
