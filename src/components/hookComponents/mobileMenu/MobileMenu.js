import React from "react";
import "./mobileMenu.scss";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function MobileMenu(props) {

    function mapMobileMenu(item, key) {
        let showItem = false;
        if (props.mobileActive === key || props.mobileActive === null) showItem = true;
        return (
            <li key={`${key}-${Math.random()}`}>
                {!!showItem && (
                    <>
                        <div
                            onClick={item.bottom ? () => props.setActive(key) : () => goTo("path")}
                            className={`mobile-menu__item ${props.mobileActive === key ? "active" : ""
                                }`}
                        >
                            <div>{item.top.anchor}</div>
                            {props.mobileActive === null && <ArrowForwardIosIcon />}
                            {props.mobileActive === key && (
                                <KeyboardBackspaceIcon fontSize={"large"} />
                            )}
                        </div>
                        {props.mobileActive === key && item.bottom && (
                            <ul>{item.bottom.map(mapMobileSubMenu)}</ul>
                        )}
                    </>
                )}
            </li>
        );
    }

    function mapMobileSubMenu(item, key) {
        return (
            <li key={`${key}-${Math.random()}`} className="mobile-menu__item">
                <div>{item.anchor}</div>
                <ArrowForwardIosIcon />
            </li>
        );
    }

    function goTo(path) {
        console.log(path);
    }

    return (
        <div
            className="main-header__mobile-menu"
            style={{ right: `${props.mobileRight}%` }}
        >
            <ul>{props.menu.map(mapMobileMenu)}</ul>
            <div className="main-header__mobile-menu__bottom">
                <button>ACCEDI</button>
                <p className="main-header__mobile-menu__bottom__text">
                    Non hai un account? REGISTRATI QUI
                </p>
            </div>
        </div>
    )
}

export default MobileMenu;