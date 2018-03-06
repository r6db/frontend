import * as React from "react";
import { ADCONFIG } from "lib/constants";

interface IAdProps {
    slot?: string;
    format?: string;
}

export default class Ad extends React.Component<IAdProps, {}> {
    componentDidMount() {
        if (window) ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    }
    render() {
        return (
            <ins
                className="ad adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-4708879883364551"
                data-ad-slot={this.props.slot || ADCONFIG.defaultSlot}
                data-ad-format={this.props.format || ADCONFIG.defaultFormat}
            />
        );
    }
}
