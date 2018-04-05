import * as React from "react";
import { hot } from "react-hot-loader";
import DetailError from "./DetailError";

function NotFoundError(props) {
    return (
        <DetailError title="Not Found">
            <p className="paragraph">uh oh... unless you manually entered this URL, you should never see this.</p>
        </DetailError>
    );
}

export default hot(module)(NotFoundError);