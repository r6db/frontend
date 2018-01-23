import * as Inferno from "inferno";
import "./fauxtable.scss";

const getEl = baseClass => props => (
    <div {...props} className={`${baseClass} ${props.className || ""}`}>
        {props.children}
    </div>
);

const Head = getEl("fauxtable__head");
const Body = getEl("fauxtable__body");
const Row = getEl("fauxtable__row");
const Heading = getEl("fauxtable__heading");
const Cell = getEl("fauxtable__cell");

export default {
    Row,
    Cell,
    Head,
    Body,
    Heading,
    Table: props => (
        <div {...props} className={`fauxtable ${props.className}`}>
            {props.children}
        </div>
    ),
};
