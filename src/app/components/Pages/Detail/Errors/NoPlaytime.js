import m from "mithril";
import DetailError from "./DetailError";

export default {

    view({attrs}) {
        return (
            <DetailError title={attrs.name}>
                <p>This Profile has not yet played the Game!</p>
                <p>Either its the first time we see this account (and it'll work in a few minutes) or this really is a profile that hasn't played R6. In that case, it'll be removed from our database at some point.</p>
            </DetailError>
        );
    }
};