import Inferno from "inferno";
import Alias from "./Alias";
import "./aliases.scss";

export default {
    view({ attrs }) {
        return (
            <div className="playermodule aliases">
                <div className="playermodule__header">Alias History</div>
                <div className="aliases__list">{attrs.aliases.map(x => <Alias alias={x} />)}</div>
            </div>
        );
    },
};
