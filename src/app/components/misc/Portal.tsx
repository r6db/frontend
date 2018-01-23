import * as Inferno from "inferno";

const getRoot = () => document.getElementById("portal");

export default function Portal(props) {
    return Inferno.createPortal(props.children, getRoot());
}
