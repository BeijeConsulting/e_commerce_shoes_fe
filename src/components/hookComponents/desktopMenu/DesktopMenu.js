import React from "react";
import "./desktopMenu.scss";

import { useNavigate } from "react-router-dom";

function DesktopMenu(props) {
    const navigate = useNavigate();

    function mapDesktopMenu(item, key) {
        if (item.bottom === false) {
            return <li key={`${key}-${Math.random()}`} onClick={() => goTo(`products/${item.path}`)}>
                <div>{item.top}</div>
            </li>
        }

        if (item.bottom === true) {
            return <li key={`${key}-${Math.random()}`}>
                <div onClick={() => goTo(`products/${item.path}`)}>{item.top}</div>
                <div className="main-header__menu__sub">
                    {item.bottom && <ul>{mapDesktopSubMenu(item.path)}</ul>}
                </div>
            </li>


        }
    }

    function mapDesktopSubMenu(path) {
        return props.categories.map(function (item, key) {
            return (
                <li key={`${key}-${Math.random()}`} onClick={() => goTo(`products/${path}/${item.path}`)}>
                    <div>{item.anchor}</div>
                </li>
            );
        })
    }

    function goTo(path) {
        navigate(path);
    }

    return (
        <ul
            className={`main-header__menu ${!!props.fullWidthInput ? "d-none" : ""
                }`}
        >
            {props.menu.map(mapDesktopMenu)}
        </ul>
    )
}

export default DesktopMenu;