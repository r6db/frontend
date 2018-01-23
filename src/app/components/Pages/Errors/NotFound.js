import Inferno from "inferno";
import DetailError from "./DetailError";

export default {

    view() {
        return (
            <DetailError title="404 - Not found">
                <p>
                    uh oh... unless you manually entered this URL, you should never see this.
                </p>
            </DetailError>
        );
    }
};
