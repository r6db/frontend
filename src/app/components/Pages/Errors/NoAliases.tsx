import * as React from "react";
import DetailError from "./DetailError";

export default function NoAliasesError(props) {
    return (
        <DetailError title="No Alias">
            <p className="paragraph">
                This Profile has no Aliases. Seeing as this is impossible, something must have gone wrong on our end and
                we'd rather not show a faulty profile.
            </p>
        </DetailError>
    );
}
