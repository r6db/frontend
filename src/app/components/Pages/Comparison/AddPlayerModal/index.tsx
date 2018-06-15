import * as React from "react";
import { connect } from "react-redux";
import Modal from "components/misc/Modal";
import Button from "components/misc/Button";
import FadeImage from "components/misc/FadeImage";
import Icon, { GLYPHS } from "components/misc/Icon";
import { findPlayer } from "lib/api";
import { formatDuration } from "lib/stats";
import { getImageLink } from "lib/domain";
import * as lozad from "lozad";
import "./addplayermodal.scss";

class AddPlayerModal extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            platform: props.platform,
            results: [],
        };
        this.onSearch = this.onSearch.bind(this);
    }
    async onSearch(e) {
        if (e && "preventDefault" in e) {
            e.preventDefault();
        }
        if (this.state.query.length > 2) {
            try {
                const results = await findPlayer(this.state.query, this.state.platform);
                this.setState({ results }, () => lozad(".fadeimage"));
            } catch (e) {
                this.setState({ results: [] });
            }
        }
    }
    onQueryChange(query) {
        this.setState({ query });
    }
    onPlatformChange(platform) {
        this.setState({ platform });
    }
    render() {
        return (
            <Modal className="addplayermodal" title="Add player" onclose={this.props.onclose}>
                <form className="searchbar addplayermodal__search" action="" onSubmit={this.onSearch}>
                    <div className="searchbar__box">
                        <input
                            className="searchbar__input"
                            type="text"
                            value={this.state.query}
                            placeholder="Enter user name..."
                            onKeyPress={e => this.onQueryChange((e.target as any).value)}
                            onChange={e => this.onQueryChange((e.target as any).value)}
                        />
                        <button onSubmit={this.onSearch} className="searchbar__submit">
                            <Icon glyph={GLYPHS.ARROWRIGHT} />
                        </button>
                    </div>
                    {/* <div className={`searchbar__platform ${this.props.platform || ''}`}>
                        <select
                            className="searchbar__platform__select"
                            value={this.props.platform}
                            onChange={e => this.onPlatformChange((e.target as any).value)}
                        >
                            <option value="PC">PC</option>
                            <option value="PS4">PS4</option>
                            <option value="XBOX">XB1</option>
                        </select>
                        <div className="searchbar__platform__arrow"><Icon glyph={GLYPHS.CHEVRONDOWN} /></div>
                    </div> */}
                    {/* Platform select broken, needs fixing */}
                </form>
                <div className="addplayermodal__results">
                    {this.state.results.length > 0 ? (
                        this.state.results.map(x => (
                            <div
                                key={x.id}
                                className={`media addplayermodal__result ${
                                    this.props.ids.find(id => id === x.id) !== undefined
                                        ? "addplayermodal__result--selected"
                                        : ""
                                }`}
                                onClick={() => this.props.onselect(x.id)}
                            >
                                <div className="media__image">
                                    <FadeImage className="lazyload" src={getImageLink(x.userId || x.Id, x.platform)} />
                                </div>
                                <div className="media__content">
                                    <div className="media__contentheader">
                                        <header className="media__header">{x.name}</header>
                                        {x.flair ? <span className="media__label">{x.flair}</span> : null}
                                    </div>
                                    <div className="media__text">
                                        <div>level {x.level}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="media">
                            <div className="media__content">
                                <div className="media__text">{this.state.query ? "no results" : null}</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="addplayermodal__close">
                    <Button 
                        label="done"
                        type="primary"
                        onClick={this.props.onclose}
                    />
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({ platform: state.platform });

export default connect(mapStateToProps)(AddPlayerModal);
