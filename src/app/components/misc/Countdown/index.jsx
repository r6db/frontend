import * as m from "mithril";
import {formatDuration} from "lib/stats";

const target = new Date(1518534000911);

const timeUntilInvitationals = function() {
    return formatDuration((target - new Date()) / 1000);
};

let interval;

const Countdown = {
    oninit() {
        interval = setInterval(m.redraw, 60 * 1000);
    },
    onremove() {
        window.clearInterval(interval);
    },
    view({ attrs, state }) {
        return (
            <div className="home__disclaimer">
                <span>{ target > new Date() ? timeUntilInvitationals() + " until the invitationals" : `Watch the invitationals at` }<br/>
                    <a href="https://twitch.tv/rainbow6">twitch.tv/rainbow6</a><br/>
                    <a href="https://twitch.tv/ubisoft">twitch.tv/ubisoft</a>
                </span>
            </div>
        );
    },
};

export default Countdown;
