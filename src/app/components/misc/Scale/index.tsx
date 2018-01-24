import * as React from "react";
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
    "med-low": 30,
    med: 40,
    "med-high": 45,
    high: 50,
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

export default function(props) {
    const scale = props.scale || defaultScale;
    const val = props.reverse ? -props.value : props.value;

    // grab the matching scale key from our definitions
    const type = Object.keys(scale)
        .map(key => ({ key, value: scale[key] }))
        .reduce((acc, curr) => (val > curr.value ? curr.key : acc), "low");

    if (val == null) {
        return <span className={`scale`} />;
    }

    return (
        <span className={`scale scale--${type}`}>
            {asString(props.value)}
            {props.children}
        </span>
    );
}
