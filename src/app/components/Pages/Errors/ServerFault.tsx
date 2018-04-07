import * as React from "react";
import { hot } from "react-hot-loader";
import DetailError from "./DetailError";
import Icon, { GLYPHS } from "components/misc/Icon";

function ServerFault(props) {
    return (
        <DetailError title="Server Error">
            <p className="paragraph">
                it looks like the server responded with an error code. <br />
            </p>
        </DetailError>
    );
}
export default hot(module)(ServerFault);

