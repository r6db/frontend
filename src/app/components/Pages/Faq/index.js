import * as m from "mithril";
import Page from "components/misc/Page";
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
                <a role="header" className="faq-item__question" onclick={state.toggle}>
                    {attrs.question}
                </a>
                <section className="faq-item__answer">{children}</section>
            </article>
        );
    },
};

export default {
    view({ attrs, state }) {
        return (
            <Page className="faq">
                <Page.Head>
                    <div className="container">
                        <div className="header">Frequently Asked Questions</div>
                    </div>
                </Page.Head>
                <Page.Content>
                    <div className="container container--small">
                        <Question question="How is 'skill-rating' on the leaderboard determined?">
                            <p>
                                The matchmaking algorithm creates a <i>skill-rating</i> value for each player that it
                                uses to find opponents. When you start out, you have a skill-rating of 25. This value
                                gets updated by playing. Basically, the better you perform, the higher your
                                skill-rating.
                            </p>
                            <p>
                                Because such system can't be perfect, another variable exists: <i>uncertainty</i>. As
                                the name suggests, uncertainty models how accurate your skill-rating is. As you play,
                                the uncertainty value constantly falls and approaches zero: "Perfect certainty". The
                                points you see in-game is called the mmr (MatchMaking Rating). This value is calculated
                                from your skill-rating, and up until Red Crow, also took your playtime into
                                consideration.
                            </p>
                            <p>
                                How does this relate to the leaderboard? When we decided on creating one, we had to find
                                a stat to use as ranking. In our opinion win-rate and kill-death-ratio are not suitable
                                for that, because they are easily skewed. For example:
                                <blockquote>
                                    In Season 2 (Dust Line) we managed to go on a 80 win streak in ranked. <br />
                                    We even managed to bring one of our mates up to a 54 win/loss ratio (thats 98%).
                                    There were (and still are) obviously way better players than us, but we had the nice
                                    stats.
                                </blockquote>
                                We'd be "better" than most players, even though we really are not (well, except one).{" "}
                                <br />
                                After a bit of thinking we realized, that the game already tracks player performance:
                                the skill-rating. By taking the skill-rating and subtracting the uncertainty, we get a
                                value that basically describes the concept of 'you are guaranteed to be at least this
                                good'. <br />
                                We feel that this value is the safest and closest we can get to an accurate
                                representation of player ability.
                            </p>
                            <p>
                                TLDR: <em>"skill-rating" = skill - uncertainty</em>
                            </p>
                            <p>
                                Of course, the board is skewed towards pre-made teams (as they have a significantly
                                higher win-rate), but given the data we have, its the best metric.
                            </p>
                        </Question>
                        <Question question="When I search for my name it says that I haven't played the game yet...">
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
                                We only update the leaderboard every 24 hours. Because of this it can take a bit until
                                you show up there. <br />
                                Also keep in mind, that we subtract your uncertainty from your skill-rating for the
                                leaderboard (see first question)
                            </p>
                        </Question>
                        <Question question="I want to develop my own stuff with r6db data. Do you guys have an API?">
                            <p>
                                The short answer is yes. Shoot us a mail and we'll get you going. Just to make it clear:
                                <em>
                                    We can and do NOT give any guarantee about uptime and availability for the API.
                                </em>{" "}
                                While Muppet does give his best, it <i>is</i> still a hobby project.
                            </p>
                        </Question>
                    </div>
                </Page.Content>
            </Page>
        );
    },
};
