import * as React from 'react';
import Searchbar from "../Searchbar";
import "./topbar.scss";

export default function Topbar(props) {
    return (
        <div className="topbar">
            <div className="topbar__container">
                <button onClick={props.onBurgerClick} className="topbar__burger"></button>
                <Searchbar className="topbar__search" />
            </div>
        </div>
    )
}