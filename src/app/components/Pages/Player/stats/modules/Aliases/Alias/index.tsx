import * as React from "react";
import { FormattedMessage } from "react-intl";
import "./alias.scss";

const formatTitle = date => (date ? new Date(date).toLocaleString() : "-");

export default function Alias(props) {
    return (
        <div className="alias">
            <div className="alias-time" title={formatTitle(props.alias.created_at)}>
                {props.alias.created_at ? (
                    new Date(props.alias.created_at).toLocaleDateString()
                ) : (
                    <FormattedMessage id="alias/noDate" />
                )}
            </div>
            <div className="alias-name">{props.alias.name}</div>
        </div>
    );
}
