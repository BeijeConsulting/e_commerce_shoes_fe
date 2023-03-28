import React from "react";
import "./desktopMenu.scss";

function DesktopMenu(props) {



    function mapDesktopMenu(item, key) {
        return (
            <li key={ `${key}-${Math.random()}` }>
                <div>{ item.top.anchor }</div>
                <div className="main-header__menu__sub">
                    { item.bottom && <ul>{ item.bottom.map(mapDesktopSubMenu) }</ul> }
                </div>
            </li>
        );
    }

    function mapDesktopSubMenu(item, key) {
        return (
            <li key={ `${key}-${Math.random()}` }>
                <div>{ item.anchor }</div>
            </li>
        );
    }

    return (
        <ul
            className={ `main-header__menu ${!!props.fullWidthInput ? "d-none" : ""
                }` }
        >
            { props.menu.map(mapDesktopMenu) }
        </ul>
    )
}

export default DesktopMenu;