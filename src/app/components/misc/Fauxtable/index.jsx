import * as m from "mithril";
import "./fauxtable.scss";

const getEl = baseClass => ({
    view: ({ attrs, children }) => (
        <div {...attrs} className={`${baseClass} ${attrs.className || ""}`}>
            {children}
        </div>
    ),
});

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
    view({ attrs, children }) {
        return (
            <div {...attrs} className={`fauxtable ${attrs.className || ""}`}>
                {children}
            </div>
        );
    },
};
