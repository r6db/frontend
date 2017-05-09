import m from "mithril";
import Loading from "components/misc/Loading";

export default {
    view() {
        return (
            <div className="detail-player is-placeholder">
                <div className="detail-header">
                    <div className="detail-headertext">
                        <div className="detail-name"></div>
                        <div className="detail-id"></div>
                    </div>
                </div>
                <div className="detail-content">
                </div>
            </div>
        );
    }
};