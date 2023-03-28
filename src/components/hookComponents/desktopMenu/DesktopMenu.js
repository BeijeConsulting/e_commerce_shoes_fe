import React from "react";
import "./desktopMenu.scss";

function DesktopMenu(props) {



    function mapDesktopMenu(item, key) {
        if (item.bottom === false) {
            return <li key={ `${key}-${Math.random()}` } onClick={ () => goTo(`/${item.top}`) }>
                <div>{ item.top }</div>
            </li>
        }

        if (item.bottom === true) {
            return <li key={ `${key}-${Math.random()}` }>
                <div onClick={ () => goTo(`/${item.top}`) }>{ item.top }</div>
                <div className="main-header__menu__sub">
                    { item.bottom && <ul>{ mapDesktopSubMenu(item.top) }</ul> }
                </div>
            </li>


        }
    }

    function mapDesktopSubMenu(path) {
        return props.categories.map(function (item, key) {
            return (
                <li key={ `${key}-${Math.random()}` } onClick={ () => goTo(`/${path}/${item}`) }>
                    <div>{ item }</div>
                </li>
            );
        })
    }

    function goTo(path) {
        console.log(path);
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