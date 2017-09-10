import * as m from "mithril";
import DetailError from "./DetailError";

export default {

    view({attrs}) {
        return (
            <DetailError title={attrs.name}>
                <p>
                    This Profile has no data! <br />
                    It looks like we haven't fetched any data for this profile yet. It should be available in a minute or two. <br />
                    In case this error persists, shoot us a tweet or email!
                </p>
            </DetailError>
        );
    }
};