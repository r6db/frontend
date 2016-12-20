import m from "mithril";

export default {
    view({attrs}) {
        return (
            <div className={`entry is-pos-${attrs.pos}`}>
                <div className="entry-place">{attrs.pos}</div>
                <div className="entry-content">
                    <a href={`/player/${attrs.id}`} className="entry-name">{attrs.name}</a>

                    <a href={`https://game-rainbow6.ubi.com/en-gb/uplay/player-statistics/${attrs.id}/multiplayer`} className="entry-link">
                        › view on uplay
                    </a>
                    <div className="entry-rating">
                        <span className="entry-valuelabel">skill rating</span>
                        <div className="entry-value">
                            {attrs.value}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};