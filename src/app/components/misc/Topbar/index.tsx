import * as React from 'react';
import Searchbar from "../Searchbar";
import Icon, { GLYPHS } from "../Icon";
import "./topbar.scss";

export default function Topbar(props) {
    return (
        <div className="topbar">
            <div className="topbar__container">
                <button onClick={props.onBurgerClick} className="topbar__burger">
                    <Icon className="topbar__icon" glyph={GLYPHS.MENU} />
                </button>
                <Searchbar className="topbar__search" />
            </div>
        </div>
    )
}
