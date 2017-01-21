import m from "mithril";
import DetailError from "./DetailError";

export default {

    view({attrs}) {
        return (
            <DetailError title={attrs.name}>
                <p>This Profile has not yet played the Game!</p>
                <p>It will removed from our database soon.</p>
            </DetailError>
        );
    }
};