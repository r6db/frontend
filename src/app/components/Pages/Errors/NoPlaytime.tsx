import * as React from "react";
import DetailError from "./DetailError";

export default function NoPlaytimeError(props) {
    return (
        <DetailError title="This Profile has not yet played the game!">
            <p className="paragraph">
                Either its the first time we see this account (and it'll work in a few minutes) or this really is a
                profile that hasn't played R6. In that case, it'll be removed from our database at some point.
            </p>
        </DetailError>
    );
}
