import m from "mithril";
import moment from "moment";

const secToHours = sec => moment.duration(sec || 0, "seconds")
    .asHours()
    .toFixed(2) + " hours";

export default {
    view: ({ attrs }) => (
        <div className="detail-timestamps module">
            <header className="module-header">Timestamps</header>
            <div className="module-content">
                <div className="module-row">
                    <div className="module-label">First added</div>
                    <div className="module-value">
                        {moment(attrs.player.created_at).fromNow()}
                    </div>
                </div>
                {attrs.player.lastPlayed
                    ? (<div className="module-row">
                        <div className="module-label">Last played</div>
                        <div className="module-value">
                            {attrs.player.lastPlayed.last_played
                                ? moment(attrs.player.lastPlayed.last_played).fromNow()
                                : "-"}
                        </div>
                    </div>)
                    : ""}
                <div className="module-row">
                    <div className="module-label">Casual</div>
                    <div className="module-value">
                        {secToHours(attrs.player.lastPlayed.casual)}
                    </div>
                </div>
                <div className="module-row">
                    <div className="module-label">Ranked</div>
                    <div className="module-value">
                        {secToHours(attrs.player.lastPlayed.ranked)}
                    </div>
                </div>
                <div className="module-row">
                    <div className="module-label">Total</div>
                    <div className="module-value">
                        {secToHours(attrs.player.lastPlayed.casual + attrs.player.lastPlayed.ranked)}
                    </div>
                </div>
            </div>
        </div>
    )
};
