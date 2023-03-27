import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./header.scss";

import MobileMenu from "../mobileMenu/MobileMenu";
import DesktopMenu from "../desktopMenu/DesktopMenu";

import { motion } from "framer-motion";

// 18n
import { use } from "i18next";

// API
import { getUser } from "../../../services/authServices";

// UTILS
import { getLocalStorage } from "../../../utils/localStorageUtils";

// REDUX
import { setUserCredentials } from "../../../redux/ducks/userDuck";

// MUI TextField
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// MUI Icons
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ClearIcon from "@mui/icons-material/Clear";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartQuantity = useSelector((state) => state.userDuck.cartItems);
  const userIsLogged = useSelector((state) => state.userDuck.isLogged);

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

  const [state, setState] = useState({
    showMobileMenu: false,
    fullWidthInput: false,
  });

  // check if there is token
  useEffect(() => {
    const token = getLocalStorage("token");
    if (!token) return;

    async function getUserInfo(token) {
      const response = await getUser(token);

      if (response.status === 200) {
        dispatch(
          setUserCredentials({
            isLogged: true,
            name: response.data.name,
            surname: response.data.surname,
            email: response.data.email,
            adresses: [...response.data.addresses],
            birthDate: {
              dayOfMonth: response.data.birthDate.dayOfMonth,
              monthValue: response.data.birthDate.monthValue,
              month: response.data.birthDate.month,
              year: response.data.birthDate.year,
            },
            cartItems: response.data.cartItems,
            wishlistItems: response.data.wishlistItems,
          })
        );
      }
    }

    getUserInfo(token);
  }, []);

  // if user is logged --> screen userInfo
  // if user is not logged --> screen identity
  function conditionalGoTo() {
    console.log("islogged", userIsLogged);
    if (userIsLogged) {
      navigate("/user-info");
    } else {
      navigate("/identity");
    }
  }

  function toggleMobileMenu() {
    setState(function (prevState) {
      return {
        ...state,
        showMobileMenu: !prevState.showMobileMenu,
      }
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
    navigate("/");
  }

  function goToCart() {
    if (cartQuantity === 0) return;
    navigate("/cart");
  }

  function searchProducts(e) {
    if (e.key.toLowerCase() !== "enter") return;
    if (!e.target.value) return;
    const term = e.target.value.split(" ").join("-");
    e.target.value = "";
    navigate(`/search?q=${term}`);
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
          <DesktopMenu menu={menu} fullWidthInput={state.fullWidthInput} />
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
            <div onClick={goToCart}>
              <IconButton aria-label="cart">
                <Badge badgeContent={cartQuantity} color="primary">
                  <ShoppingCartIcon fontSize={"large"} />
                </Badge>
              </IconButton>
            </div>
            <div onClick={conditionalGoTo}>
              <IconButton aria-label="cart">
                <AccountCircleIcon fontSize={"large"} />
              </IconButton>
            </div>
          </div>
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
        <MobileMenu
          menu={menu}
          showMobileMenu={state.showMobileMenu}
        />
      </nav>
    </header >
  );
}

export default Header;
