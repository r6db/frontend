import * as m from "mithril";

const daysUntilInvitationals = function() {
    const oneDay = 24 * 60 * 60 * 1000;
    const target = new Date(1518534000911);
    const currentDate = new Date();
    if (currentDate > target) {
        return 0;
    }
    return Math.round(Math.abs((target.getTime() - currentDate.getTime())/(oneDay)));
};


const Countdown = {
    view({ attrs, state }) {
        return (
            <div className="home__disclaimer">
                {
                    daysUntilInvitationals() > 0 ?
                        `${daysUntilInvitationals()} days left until the invitationals`:
                        (<span>Watch the invitationals at<br/>
                            <a href="https://twitch.tv/rainbow6">https://twitch.tv/rainbow6</a></span>)
                }
            </div>
        );
    },
};

export default Countdown;
