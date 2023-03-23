import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.scss";

// MUI TextField
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// MUI Icons
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ClearIcon from "@mui/icons-material/Clear";

function Header() {
  const navigate = useNavigate();

  const cartQuantity = useSelector((state) => state.userDuck.cartItems);
  console.log(cartQuantity);

  const menu = [
    {
      top: {
        anchor: "uomo",
      },
      bottom: [
        {
          anchor: "sportive",
        },
        {
          anchor: "eleganti",
        },
        {
          anchor: "casual",
        },
      ],
    },
    {
      top: {
        anchor: "donna",
      },
      bottom: [
        {
          anchor: "sportive",
        },
        {
          anchor: "eleganti",
        },
        {
          anchor: "casual",
        },
      ],
    },
    {
      top: {
        anchor: "unisex",
      },
      bottom: [
        {
          anchor: "sportive",
        },
        {
          anchor: "eleganti",
        },
        {
          anchor: "casual",
        },
      ],
    },
    {
      top: {
        anchor: "brand",
      },
    },
    {
      top: {
        anchor: "offerte",
      },
    },
    {
      top: {
        anchor: "nuovi arrivi",
      },
    },
  ];

  let menuInterval = null;
  let inputInterval = null;

  const [state, setState] = useState({
    showMobileMenu: false,
    right: 100,
    active: null,
    fullWidthInput: false,
    width: 20,
  });

  useEffect(() => {
    menuInterval = setInterval(() => {
      let right = null;
      if (state.right === 0) return;
      if (state.right === 100 && !state.showMobileMenu) return;
      right = state.right - 10;
      setState({
        ...state,
        right: right,
      });
    }, 1);

    return () => clearInterval(menuInterval);
  }, [state.showMobileMenu, state.right]);

  useEffect(() => {
    inputInterval = setInterval(() => {
      let width = null;
      if (state.width === 70) return;
      if (state.width === 20 && !state.fullWidthInput) return;
      width = state.width + 5;
      setState({
        ...state,
        width: width,
      });
    }, 4);

    return () => clearInterval(inputInterval);
  }, [state.fullWidthInput, state.width]);

  function setActive(key) {
    let menuIndex = state.active === null ? key : null;
    setState({
      ...state,
      active: menuIndex,
    });
  }

  function toggleMobileMenu() {
    let right = 100;
    if (!!state.showMobileMenu) right = 0;
    setState({
      ...state,
      showMobileMenu: !state.showMobileMenu,
      active: null,
      right,
    });
  }

  function toggleInput() {
    setState({
      ...state,
      width: 20,
      fullWidthInput: !state.fullWidthInput,
    });
  }

  function goToHome(e) {
    e.preventDefault();
    navigate("/");
  }

  function goTo(path) {
    console.log(path);
  }

  function mapMobileMenu(item, key) {
    let showItem = false;
    if (state.active === key || state.active === null) showItem = true;
    return (
      <li key={`${key}-${Math.random()}`}>
        {!!showItem && (
          <>
            <div
              onClick={item.bottom ? () => setActive(key) : () => goTo("path")}
              className={`mobile-menu__item ${
                state.active === key ? "active" : ""
              }`}
            >
              <div>{item.top.anchor}</div>
              {state.active === null && <ArrowForwardIosIcon />}
              {state.active === key && (
                <KeyboardBackspaceIcon fontSize={"large"} />
              )}
            </div>
            {state.active === key && item.bottom && (
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

  function mapDesktopMenu(item, key) {
    return (
      <li key={`${key}-${Math.random()}`}>
        <div>{item.top.anchor}</div>
        <div className="main-header__menu__sub">
          {item.bottom && <ul>{item.bottom.map(mapDesktopSubMenu)}</ul>}
        </div>
      </li>
    );
  }

  function mapDesktopSubMenu(item, key) {
    return (
      <li key={`${key}-${Math.random()}`}>
        <div>{item.anchor}</div>
      </li>
    );
  }

  return (
    <header className="main-header">
      <nav>
        <div className="main-header__top">
          <div className="main-header__top__left">
            {!state.showMobileMenu && (
              <MenuIcon
                onClick={toggleMobileMenu}
                className="main-header__hamburger"
                fontSize={"large"}
              />
            )}
            {!!state.showMobileMenu && (
              <ClearIcon
                onClick={toggleMobileMenu}
                className="main-header__hamburger"
                fontSize={"large"}
              />
            )}
            <a onClick={goToHome} href="">
              <img
                className="main-header__logo"
                src={require("../../../assets/images/logo/logo-312.png")}
                alt="logo"
              />
            </a>
          </div>
          <ul
            className={`main-header__menu ${
              !!state.fullWidthInput ? "d-none" : ""
            }`}
          >
            {menu.map(mapDesktopMenu)}
          </ul>
          <div
            className="main-header__top__input"
            style={{ width: `${state.width}rem` }}
          >
            <TextField
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
          <IconButton aria-label="cart">
            <Badge badgeContent={cartQuantity} color="primary">
              <ShoppingCartIcon fontSize={"large"} />
            </Badge>
          </IconButton>
        </div>
        <div className="main-header__bottom">
          <TextField
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
        {!!state.showMobileMenu && (
          <div
            className="main-header__mobile-menu"
            style={{ right: `${state.right}%` }}
          >
            <ul>{menu.map(mapMobileMenu)}</ul>
            <div className="main-header__mobile-menu__bottom">
              <button>ACCEDI</button>
              <p className="main-header__mobile-menu__bottom__text">
                Non hai un account? REGISTRATI QUI
              </p>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
