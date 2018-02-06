import * as React from "react";
import DetailError from "./DetailError";
import Icon, { GLYPHS } from "components/misc/Icon";

export default function Maintenance(props) {
    return (
        <DetailError title="Server Error">
            <p className="paragraph">
                it looks like the server responded with an error code. <br />
            </p>
        </DetailError>
    );
}
