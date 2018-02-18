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
                GG
            </div>
        );
    },
};

export default Countdown;
