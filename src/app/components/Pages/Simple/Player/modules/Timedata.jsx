import Inferno from "inferno";
import { formatDuration } from "lib/stats";

export default {
    view: ({ attrs }) => (
        <div className="profile-timestamps card">
            <header className="card__header">Timestamps</header>
            <div className="card__content">
                <div className="row">
                    <div className="label">First added</div>
                    <div className="value">{new Date(attrs.player.created_at).toLocaleDateString()}</div>
                </div>
                {attrs.player.lastPlayed ? (
                    <div className="row">
                        <div className="label">Last played</div>
                        <div className="value">
                            {attrs.player.lastPlayed.last_played
                                ? new Date(attrs.player.lastPlayed.last_played).toLocaleDateString()
                                : "-"}
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <div className="row">
                    <div className="label">Casual</div>
                    <div className="value">{formatDuration(attrs.player.lastPlayed.casual)}</div>
                </div>
                <div className="row">
                    <div className="label">Ranked</div>
                    <div className="value">{formatDuration(attrs.player.lastPlayed.ranked)}</div>
                </div>
                <div className="row">
                    <div className="label">Total</div>
                    <div className="value">
                        {formatDuration(attrs.player.lastPlayed.casual + attrs.player.lastPlayed.ranked)}
                    </div>
                </div>
            </div>
        </div>
    ),
};
