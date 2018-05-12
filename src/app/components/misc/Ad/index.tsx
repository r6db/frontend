import * as React from "react";
import { ADCONFIG } from "lib/constants";
import "./ad.scss";

interface IAdProps {
    slot?: string;
    format?: string;
    type?:
        | "leaderboard"
        | "largerect"
        | "mediumrect"
        | "halfpage"
        | "mobilebanner";
    hidden?: boolean;
}

export default class Ad extends React.Component<IAdProps, {}> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (!this.props.hidden && window)
            ((window as any).adsbygoogle =
                (window as any).adsbygoogle || []).push({});
    }
    render() {
        // exit early if hidden
        if (this.props.hidden) {
            return null;
        }
        if (
            process.env.NODE_ENV === "production" &&
            location.host === "r6db.com"
        ) {
            // only show ads on the prod site
            return (
                <ins
                    className={`ad adsbygoogle ad--${this.props.type ||
                        "noformat"}`}
                    data-ad-client="ca-pub-4708879883364551"
                    data-ad-slot={this.props.slot || ADCONFIG.defaultSlot}
                    data-ad-format={this.props.format || ADCONFIG.defaultFormat}
                />
            );
        } else if (process.env.NODE_ENV === "development") {
            // show fake ads in dev
            return (
                <ins
                    className={`ad adsbyfake ad--${this.props.type ||
                        "noformat"}`}
                />
            );
        } else {
            // otherwise show nothing
            return null;
        }
    }
}
