import m from "mithril";
import DetailError from "./DetailError";

export default {

    view({attrs}) {
        return (
            <DetailError title={attrs.name}>
                <p>Either this Profile is new to us and we haven't gotten the stats yet, or it has no playtime</p>
            </DetailError>
        );
    }
};