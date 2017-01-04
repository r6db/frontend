import m from "mithril";
import DetailError from "./DetailError";

export default {

    view({attrs}) {
        return (
            <DetailError title="No Aliases">
                <p>
                    This Profile has no Aliases. Seeing as this is impossible, something must have  went wrong on our end and we'd rather not show a faulty profile.
                </p>
            </DetailError>
        );
    }
};