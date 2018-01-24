import * as React from "react";
import DetailError from "./DetailError";

export default function NotFoundError(props) {
    return (
        <DetailError title="Not Found">
            <p className="paragraph">uh oh... unless you manually entered this URL, you should never see this.</p>
        </DetailError>
    );
}
