import * as m from "mithril";

function formatDuration(seconds) {
    const rawHours = seconds / (60 * 60);
    const hours = rawHours | 0;
    const minutes = ((rawHours % 1) * 60).toFixed(0);
    return `${hours}h ${minutes}m`;
}

export default {
    view: ({ attrs }) => (
        <div className="detail-timestamps module">
            <header className="module-header">Timestamps</header>
            <div className="module-content">
                <div className="module-row">
                    <div className="module-label">First added</div>
                    <div className="module-value">
                        {new Date(attrs.player.created_at).toLocaleDateString()}
                    </div>
                </div>
                {attrs.player.lastPlayed
                    ? (<div className="module-row">
                        <div className="module-label">Last played</div>
                        <div className="module-value">
                            {attrs.player.lastPlayed.last_played
                                ? new Date(attrs.player.lastPlayed.last_played).toLocaleDateString()
                                : "-"}
                        </div>
                    </div>)
                    : ""}
                <div className="module-row">
                    <div className="module-label">Casual</div>
                    <div className="module-value">
                        {formatDuration(attrs.player.lastPlayed.casual)}
                    </div>
                </div>
                <div className="module-row">
                    <div className="module-label">Ranked</div>
                    <div className="module-value">
                        {formatDuration(attrs.player.lastPlayed.ranked)}
                    </div>
                </div>
                <div className="module-row">
                    <div className="module-label">Total</div>
                    <div className="module-value">
                        {formatDuration(attrs.player.lastPlayed.casual + attrs.player.lastPlayed.ranked)}
                    </div>
                </div>
            </div>
        </div>
    )
};
