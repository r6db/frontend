import * as Inferno from "inferno";
import DetailError from "./DetailError";

export default function Maintenance(props) {
    return (
        <DetailError title="This Profile has no data!">
            <p className="paragraph">
                It looks like we haven't fetched any data for this profile yet. It should be available in a minute or
                two. <br />
                In case this error persists, shoot us a tweet or email!
            </p>
        </DetailError>
    );
}
