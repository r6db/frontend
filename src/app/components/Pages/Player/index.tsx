import * as Inferno from "inferno";
import Stats from "./stats";
import Operators from "./operators";
import Ranks from "./ranks";
import NotFound from "../Errors/NotFound";
import NoPlaytime from "../Errors/NoPlaytime";
import NoAliases from "../Errors/NoAliases";
import NoData from "../Errors/NoData";
import Header from "./Header";
import { connect } from "inferno-redux";
import { updatePlayer } from "lib/store/actions";
import Page, { PageHead, PageContent } from "components/misc/Page";
import "./player.scss";

import background from "./RB6_WhiteNoise_Teaser1.jpg";

function Player(props) {
    if (props.loading) {
        return null;
    } else if (!props.data) {
        return <NotFound />;
    } else if (props.data.flags && props.data.flags.noPlaytime) {
        return <NoPlaytime {...props.data} />;
    } else if (props.data.flags && props.data.flags.noAliases) {
        return <NoAliases {...props.data} />;
    } else if (!props.data.stats || !props.data.rank) {
        return <NoData {...props.data} />;
    } else {
        return (
            <Page className={"player " + props.data.id}>
                <PageHead image={background}>
                    <Header
                        tab={props.tab}
                        platform={props.platform}
                        updatePlayer={props.updatePlayer}
                        {...props.data}
                    />
                </PageHead>
                <PageContent>
                    <div className="container player__tab">
                        {props.tab === "summary" ? <Stats key="summary" {...props.data} /> : null}
                        {props.tab === "ops" ? <Operators key="ops" {...props.data} /> : null}
                        {props.tab === "ranks" ? <Ranks key="ranks" {...props.data} /> : null}
                    </div>
                </PageContent>
            </Page>
        );
    }
}

const mapStateToProps = state => {
    const { platform, loading, players, location } = state;

    return {
        data: players[location.payload.id],
        tab: location.payload.tab || "summary",
        loading,
        platform,
    };
};
const mapDispatchtoProps = (dispatch) => {
    return {
        updatePlayer: (id) => dispatch(updatePlayer(id)),
    };
};
export default connect(mapStateToProps, mapDispatchtoProps)(Player);
