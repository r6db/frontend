import * as m from "mithril";
import "./faq.scss";

const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;

const showPlayer = id => e => page("/player/" + id);

const Question = {
    oninit({ attrs, state }) {
        state.isOpen = true;
        state.toggle = function() {
            state.isOpen = !state.isOpen;
            m.redraw();
        };
    },
    view({ attrs, state, children }) {
        return (
            <article className={`faq-item ${state.isOpen ? "is-open" : "is-closed"}`}>
                <a role="header" className="faq-question" onclick={state.toggle}>
                    {attrs.question}
                </a>
                <section className="faq-answer">{children}</section>
            </article>
        );
    },
};

export default {
    view({ attrs, state }) {
        return (
            <div className="faq">
                <Question question="How is 'skill-rating' on the leaderboard determined?">
                    <p>
                        The matchmaking algorithm creates a <i>skill-rating</i> value for each player that it uses to
                        find opponents. When you start out, you have a skill-rating of 25. This value gets updated by
                        playing. Basically, the better you perform, the higher your skill-rating.
                    </p>
                    <p>
                        Because such system can't be perfect, another variable exists: <i>uncertainty</i>. As the name
                        suggests, uncertainty models how accurate your skill-rating is. As you play, the uncertainty
                        value constantly falls and approaches zero: "Perfect certainty". The points you see in-game is
                        called the mmr (MatchMaking Rating). This value is calculated from your skill-rating, and up
                        until Red Crow, also took your playtime into consideration.
                    </p>
                    <p>
                        How does this relate to the leaderboard? When we decided on creating one, we had to find a stat
                        to use as ranking. In our opinion win-rate and kill-death-ratio are not suitable for that,
                        because they are easily skewed. For example:
                        <blockquote>
                            In Season 2 (Dust Line) we managed to go on a 80 win streak in ranked. <br />
                            We even managed to bring one of our mates up to a 54 win/loss ratio (thats 98%). There were
                            (and still are) obviously way better players than us, but we had the nice stats.
                        </blockquote>
                        We'd be "better" than most players, even though we really are not (well, except one). <br />
                        After a bit of thinking we realized, that the game already tracks player performance: the
                        skill-rating. By taking the skill-rating and subtracting the uncertainty, we get a value that
                        basically describes the concept of 'you are guaranteed to be at least this good'. <br />
                        We feel that this value is the safest and closest we can get to an accurate representation of
                        player ability.
                    </p>
                    <p>
                        TLDR: <em>"skill-rating" = skill - uncertainty</em>
                    </p>
                    <p>
                        Of course, the board is skewed towards pre-made teams (as they have a significantly higher
                        win-rate), but given the data we have, its the best metric.
                    </p>
                </Question>
                <Question question="I searched for my name, but it says that I haven't played the game yet.">
                    <p>
                        The error can be triggered in multiple ways:
                        <ul>
                            <li>we didn't grab your data yet. Try again in a few minutes</li>
                            <li>you're looking on the wrong platform (see links at the top of the menu)</li>
                            <li>you actually don't own the game, or didn't play</li>
                        </ul>
                    </p>
                </Question>
                <Question question="I won a match and should appear on the leaderboard. Why am i not on there?">
                    <p>
                        We only update the player profiles every 24 hours. Because of this it can take a bit until you
                        show up there. <br />
                        Also keep in mind, that we subtract your uncertainty from your skill-rating for the leaderboard
                        (see first question)
                    </p>
                </Question>
                <Question question="I want to develop my own stuff with r6db data. Do you guys have an API?">
                    <p>
                        The short answer is yes. Shoot us a mail and we'll get you going. Just to make it clear:
                        <em>We can and do NOT give any guarantee about uptime and availability for the API.</em> While
                        Muppet does give his best, it <i>is</i> still a hobby project.
                    </p>
                </Question>
                <Question question="What technologies do you guys use?">
                    <p>
                        The backend is written in <a href="https://nodejs.org/en/">Node JS</a>, and uses{" "}
                        <a href="https://www.postgresql.org/">Postgresql</a> and <a href="https://redis.io/">Redis</a>{" "}
                        as data storage. Updates are running over <a href="https://www.rabbitmq.com">RabbitMQ</a>.
                    </p>
                    <p>
                        On the frontend, we use <a href="https://mithril.js.org/">Mithril</a> (highly recommended) as
                        framework with <a href="https://redux.js.org">Redux</a> for state management and{" "}
                        <a href="https://github.com/faceyspacey/redux-first-router">redux-first-router</a> for routing.
                        <br />
                        We had a strong focus on high performance and small size with visuals coming second. This is the
                        reason why we use so little images and animations. Most images you see are actually SVGs, which
                        scale perfectly and have a small size. <br />
                        This allows us to load the site in 200ms (for the landing page) on DSL, and 1.1 seconds on a
                        good 3G connection.
                    </p>
                </Question>
            </div>
        );
    },
};
