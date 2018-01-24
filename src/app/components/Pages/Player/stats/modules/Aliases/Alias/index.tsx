import * as Inferno from "inferno";
import "./alias.scss";

const formatTitle = date => (date ? new Date(date).toLocaleString() : "no Date");

export default function Alias(props) {
    return (
        <div className="alias">
            <div className="alias-time" title={formatTitle(props.alias.created_at)}>
                {props.alias.created_at ? new Date(props.alias.created_at).toLocaleDateString() : "no Date"}
            </div>
            <div className="alias-name">{props.alias.name}</div>
        </div>
    );
}
