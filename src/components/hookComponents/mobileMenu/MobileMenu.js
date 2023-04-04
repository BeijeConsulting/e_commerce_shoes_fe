import React, { useState } from "react";
import "./mobileMenu.scss";

import { motion, AnimatePresence } from "framer-motion";
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import i18n from "../../../assets/translations/i18n";
import Button from "../../functionalComponents/button/Button";
import { useSelector, useDispatch } from "react-redux";
import Avatar from '@mui/material/Avatar';
import { signOut } from "../../../services/authServices";
import { removeUserCredentials } from "../../../redux/ducks/userDuck";
import { removeToken } from "../../../redux/ducks/tokenDuck";
import { clearLocalStorage } from "../../../utils/localStorageUtils";
import { ToastContainer, toast } from "react-toastify";

function MobileMenu(props) {
    const lang = i18n.language.slice(0, 2);
    const navigate = useNavigate();
    const user = useSelector((state) => state.userDuck);
    const initials = user.name.slice(0, 1) + user.surname.slice(0, 1);
    const token = useSelector((state) => state.tokenDuck.token);
    const refreshT = useSelector((state) => state.tokenDuck.refreshToken);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        active: null,
    });

    function setActive(e) {
        if (state.active !== null) return;
        const selected = e.target.getAttribute('data-menu-path');
        let active = state.active === null ? selected : null;
        setState({
            ...state,
            active,
        });
    }

    function resetActive() {
        setState({
            ...state,
            active: null,
        });
    }

    function mapMobileMenu(item, key) {
        let path = `scarpe/${item.path}`;
        let showItem = false;
        if (state.active === item.path || state.active === null) showItem = true;

        if (item.bottom === false) {
            if (item.path === "brand") path = `/${lang}/brand`;
            return <li key={`${key}-${Math.random()}`}>
                {state.active === null && <div
                    onClick={goTo(path)}
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
                    {!!showItem &&
                        <>
                            <div
                                onClick={setActive}
                                data-menu-path={item.path}
                                className={`mobile-menu__item ${state.active === item.path ? "active" : ""
                                    }`}
                            >

                                <div onClick={setActive} data-menu-path={item.path}>{item.top}</div>
                                {state.active === null && <ArrowForwardIosIcon />}
                                {state.active === item.path &&
                                    <div className="mobile-menu__item--clicked">
                                        <div className="mobile-menu__item--clicked__all" onClick={goTo(`${path}`)}>TUTTE</div>
                                        <KeyboardBackspaceIcon onClick={resetActive} fontSize={"large"} />
                                    </div>
                                }
                            </div>
                            {state.active === item.path && (
                                <ul>{mapMobileSubMenu(item.path)}</ul>
                            )}
                        </>
                    }
                </li>
            );
        }
    }

    function mapMobileSubMenu(path) {
        return props.categories.map(function (item, key) {
            return (
                <li key={`${key}-${Math.random()}`} className="mobile-menu__item" onClick={goTo(`scarpe/${path}/${item.path}`)}>
                    <div>{item.anchor}</div>
                    <ArrowForwardIosIcon />
                </li>
            );
        })
    }

    const goTo = (path) => () => {
        props.hideMenuFunc();
        navigate(path);
    }

    function goToSignup() {
        props.hideMenuFunc();
        navigate("accedi/registrati");
    }

    function goToSignin() {
        props.hideMenuFunc();
        navigate("accedi");
    }

    function goToAccount() {
        props.hideMenuFunc();
        navigate("area-personale");
    }

    function notifyLogOutError() {
        toast.error("Errore nel Logout", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    }

    function notifyLogOutSuccess() {
        toast.success("Logout", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 500,
        });
    }

    async function userLogOut() {
        const response = await signOut(refreshT, token);
        if (response.status < 300) {
            props.hideMenuFunc();
            dispatch(removeUserCredentials());
            dispatch(removeToken());
            clearLocalStorage();
            notifyLogOutSuccess();
        } else {
            notifyLogOutError();
        }
    }

    return (
        <AnimatePresence>
            {props.showMobileMenu && (
                <motion.div
                    style={{
                        position: "absolute",
                        top: "100%",
                        width: "100%",
                        zIndex: 100,
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
                            {!!user.isLogged ?
                                <>
                                    <div className="main-header__mobile-menu__bottom__user-info">
                                        <Avatar sx={{ bgcolor: "#4f4f4f" }} onClick={goToAccount}>{initials}</Avatar>
                                        <div className="main-header__mobile-menu__bottom__user-info__info" onClick={goToAccount}>
                                            <div>{user.name + " " + user.surname}</div>
                                            <div>vai al profilo</div>
                                        </div>
                                    </div>
                                    <div className="main-header__mobile-menu__bottom__text logged">
                                        <LogoutIcon fontSize={"large"} onClick={userLogOut} />
                                        <div onClick={userLogOut}>logout</div>
                                    </div>
                                </>
                                :
                                <>
                                    <Button label={"accedi"} buttonStyle={"default-button full-width"} handleClick={goToSignin} />
                                    <p className="main-header__mobile-menu__bottom__text" onClick={goToSignup}>
                                        Non hai un account? REGISTRATI QUI
                                    </p>
                                </>
                            }
                        </div>
                        <ToastContainer hideProgressBar />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MobileMenu;