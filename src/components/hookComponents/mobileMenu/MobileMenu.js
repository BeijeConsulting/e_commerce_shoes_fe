import React, { useState } from "react";
import "./mobileMenu.scss";

import { motion, AnimatePresence } from "framer-motion";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";


function MobileMenu(props) {
    const navigate = useNavigate();
    const [state, setState] = useState({
        active: null,
    });

    const setActive = (key) => () => {
        let menuIndex = state.active === null ? key : null;
        setState({
            ...state,
            active: menuIndex,
        });
    }

    function mapMobileMenu(item, key) {
        let showItem = false;
        if (state.active === key || state.active === null) showItem = true;

        if (item.bottom === false) {
            return <li key={`${key}-${Math.random()}`}>
                {state.active === null && <div
                    onClick={() => goTo(`scarpe/${item.path}`)}
                    className={"mobile-menu__item"}
                >
                    <div>{item.top}</div>
                    <ArrowForwardIosIcon />
                </div>}
            </li>
        }

        if (item.bottom === true) {
            return (
                <li key={`${key}-${Math.random()}`}>
                    {!!showItem && (
                        <>
                            <div
                                onClick={setActive(key)}
                                className={`mobile-menu__item ${state.active === key ? "active" : ""
                                    }`}
                            >
                                <div>{item.top}</div>
                                {state.active === null && <ArrowForwardIosIcon />}
                                {state.active === key && (
                                    <KeyboardBackspaceIcon fontSize={"large"} />
                                )}
                            </div>
                            {state.active === key && (
                                <ul>{mapMobileSubMenu(item.path)}</ul>
                            )}
                        </>
                    )}
                </li>
            );
        }
    }

    function mapMobileSubMenu(path) {
        return props.categories.map(function (item, key) {
            return (
                <li key={`${key}-${Math.random()}`} className="mobile-menu__item" onClick={() => goTo(`products/${path}/${item.path}`)}>
                    <div>{item.anchor}</div>
                    <ArrowForwardIosIcon />
                </li>
            );
        })
    }

    function goTo(path) {
        navigate(path);
    }

    return (
        <AnimatePresence>
            {props.showMobileMenu && (
                <motion.div
                    style={{
                        position: "absolute",
                        top: "100%",
                        width: "100%",
                        zIndex: 2,
                    }}
                    initial={{ right: "100%" }}
                    animate={{ right: "0%" }}
                    exit={{ right: "100%" }}
                    transition={{
                        duration: 0.1,
                    }}
                >
                    <div
                        className="main-header__mobile-menu"
                    >
                        <ul>{props.menu.map(mapMobileMenu)}</ul>
                        <div className="main-header__mobile-menu__bottom">
                            <button>ACCEDI</button>
                            <p className="main-header__mobile-menu__bottom__text">
                                Non hai un account? REGISTRATI QUI
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MobileMenu;