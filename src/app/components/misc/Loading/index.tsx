import * as Inferno from "inferno";
import "./loading.scss";

const componentWillUnMount = node => node.classList.add("loading--leaving");

export const Loading = () => (
    <div componentWillUnMount={componentWillUnMount} className="loading">
        <div className="loading__indicator" />
    </div>
);
