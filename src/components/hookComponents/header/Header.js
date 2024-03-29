import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./header.scss";

import MobileMenu from "../mobileMenu/MobileMenu";
import DesktopMenu from "../desktopMenu/DesktopMenu";

import { motion } from "framer-motion";

// MUI TextField
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import UserMenuNav from '../userMenuNav/UserMenuNav';
import CartNavMenu from '../cartNavMenu/CartNavMenu';
import i18n from '../../../assets/translations/i18n';

import { getCategories } from "../../../services/productServices";
import WishListNav from '../wishListNav/WishListNav';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

function Header() {
  const navigate = useNavigate();
  const userIsLogged = useSelector((state) => state.userDuck.isLogged);
  const lang = i18n.language.slice(0, 2);
  const { t } = useTranslation();

  const menu = [
    {
      top: t("header.man"),
      path: "uomo",
      bottom: true,
    },
    {
      top: t("header.woman"),
      path: "donna",
      bottom: true,
    },
    {
      top: "unisex",
      path: "unisex",
      bottom: true,
    },
    {
      top: t("header.brands"),
      path: `brand`,
      bottom: false,
    },
    {
      top: t("header.new"),
      path: "novita",
      bottom: false,
    },
  ];

  const [state, setState] = useState({
    showMobileMenu: false,
    fullWidthInput: false,
    categories: [],
  });

  useEffect(() => {
    fetchCategories();
  }, [lang])

  async function fetchCategories() {
    let categories = [];
    const result = await getCategories(lang);
    for (let i = 0; i < result.data.length; i++) {
      categories.push({
        anchor: result.data[i].category.toLowerCase(),
        path: result.data[i].code.includes(" ") ? result.data[i].code.toLowerCase().split(" ").join("-") : result.data[i].code.toLowerCase(),

      })
    }
    setState(
      {
        ...state,
        categories,
      }
    )
  }

  function showMobileMenu() {
    document.body.style.overflow = "hidden";
    setState({
      ...state,
      showMobileMenu: true,
    });
  }

  function hideMobileMenu() {
    document.body.style.removeProperty('overflow');
    setState({
      ...state,
      showMobileMenu: false,
    });
  }

  function toggleInput() {
    setState(function (prevState) {
      return {
        ...state,
        fullWidthInput: !prevState.fullWidthInput,
      }
    });
  }

  function goToHome(e) {
    e.preventDefault();
    if (!!state.showMobileMenu) hideMobileMenu();
    navigate(`/${lang}`);
  }

  function searchProducts(e) {
    if (e.key.toLowerCase() !== "enter") return;
    if (!e.target.value) return;
    const term = e.target.value.split(" ").join("-");
    e.target.value = "";
    hideMobileMenu();
    navigate(`ricerca?q=${term}`);
  }

  return (
    <header className="main-header">
      <nav>
        <div className="main-header__top">
          <div className="main-header__top__left">
            {!state.showMobileMenu && (
              <MenuIcon
                onClick={showMobileMenu}
                className="main-header__hamburger"
                fontSize={"large"}
              />
            )}
            {!!state.showMobileMenu && (
              <ClearIcon
                onClick={hideMobileMenu}
                className="main-header__hamburger"
                fontSize={"large"}
              />
            )}
            <a onClick={goToHome} href="">
              <picture>
                <source
                  className="main-header__logo"
                  media="(max-width:768px)"
                  srcSet={require("../../../assets/images/logo/download.png")}
                />
                <img
                  className="main-header__logo"
                  src={require("../../../assets/images/logo/belle-scarpe-logo.png")}
                  alt="sneakers"
                />
              </picture>
            </a>
          </div>
          <DesktopMenu
            categories={state.categories}
            menu={menu}
            fullWidthInput={state.fullWidthInput}
          />
          <motion.div
            initial={false}
            style={{ margin: "0 5rem 0 4rem" }}
            animate={state.fullWidthInput ? {
              width: "50%", transition: {
                duration: 0.3,
              },
            } : {
              width: "20%", transition: {
                duration: 0,
              },
            }}
          >
            <div
              className="main-header__top__input"
              style={{ width: `${state.width}rem` }}
            >
              <TextField
                onKeyUp={searchProducts}
                onBlur={toggleInput}
                onFocus={toggleInput}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize={"large"} />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </div>
          </motion.div>

          <div className="main-header__user-icons">
            {userIsLogged && <WishListNav />}
            <CartNavMenu hideMenuFunc={hideMobileMenu} />
            <UserMenuNav hideMenuFunc={hideMobileMenu} />
          </div>

        </div>
        <div className="main-header__bottom">
          <TextField
            onKeyUp={searchProducts}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ cursor: "pointer" }}>
                  <SearchIcon fontSize={"large"} />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>
        <MobileMenu
          hideMenuFunc={hideMobileMenu}
          categories={state.categories}
          menu={menu}
          showMobileMenu={state.showMobileMenu}
        />
      </nav>
    </header >
  );
}

export default Header;
