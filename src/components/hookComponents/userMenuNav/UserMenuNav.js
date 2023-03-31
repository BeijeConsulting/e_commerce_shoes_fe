import React, { useState } from "react";
import PropTypes from "prop-types";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { removeUserCredentials } from "../../../redux/ducks/userDuck";
// Router
import { useNavigate } from "react-router-dom";
// Utils
import { clearLocalStorage } from "../../../utils/localStorageUtils";
// API
import { signOut } from "../../../services/authServices";
// MUI
import { AccountCircle, Logout } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
// SCSS
import "./userMenuNav.scss";
import i18n from "../../../assets/translations/i18n";
import { useTranslation } from "react-i18next";
import { removeToken } from "../../../redux/ducks/tokenDuck";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserMenuNav(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const token = useSelector((state) => state.tokenDuck.token);
  const refreshToken = useSelector((state) => state.tokenDuck.refreshToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lang = i18n.language.slice(0, 2);
  const { t } = useTranslation();

  function notifyLogOutSuccess() {
    toast.success("Logout", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
  }
  function notifyLogOutError() {
    toast.error("Errore nel Logout", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  const userIsLogged = useSelector((state) => state.userDuck.isLogged);

  // if user is logged --> screen userInfo
  // if user is not logged --> screen identity
  function conditionalGoTo() {
    console.log("islogged", userIsLogged);
    if (userIsLogged) {
      navigate("area-personale");
    } else {
      navigate("accedi");
    }

    handleClose();
  }

  function conditionalGoToCart() {
    console.log("islogged", userIsLogged);
    if (userIsLogged) {
      navigate("area-personale/ordini");
    } else {
      navigate("accedi");
    }

    handleClose();
  }

  function goToRegistration() {
    navigate("accedi/registrati");

    handleClose();
  }

  async function userLogOut() {
    try {
      const response = await signOut(refreshToken, token);
      console.log("SIGNOUT", response);

      dispatch(removeUserCredentials());

      dispatch(removeToken());

      clearLocalStorage();

      notifyLogOutSuccess();
      setTimeout(() => {
        navigate(`/${lang}/`);
      }, 1500);
    } catch {
      notifyLogOutError();
    }
  }

  // function goToOrders() {
  //     navigate("user-info/order-list")
  // }

  return (
    <div className="userMenuNav">
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle fontSize="large" />
        </IconButton>
        <Menu
          className="myMenu"
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "center",
            horizontal: 66,
          }}
          keepMounted
          transformOrigin={{
            vertical: -30,
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={conditionalGoTo}>
            <Avatar sx={{ marginRight: 2 }} />
            {userIsLogged ? (
              <p onClick={conditionalGoTo} className="item">
                <span>{t("userMenuNav.profile")}</span>
              </p>
            ) : (
              <p onClick={conditionalGoTo} className="item">
                {t("userMenuNav.logIn")}
              </p>
            )}
          </MenuItem>
          <MenuItem onClick={conditionalGoTo}>
            {<p className="item">WishList</p>}
          </MenuItem>
          <MenuItem onClick={conditionalGoToCart}>
            {<p className="item">{t("userMenuNav.orders")}</p>}
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout className="logOut" />
            </ListItemIcon>
            {userIsLogged ? (
              <p onClick={userLogOut} className="logOut__p">
                Logout
              </p>
            ) : (
              <p onClick={goToRegistration} className="logOut__p">
                Registrati
              </p>
            )}
          </MenuItem>
        </Menu>
      </div>
      <ToastContainer hideProgressBar />
    </div>
  );
}

UserMenuNav.defaultProps = {};

UserMenuNav.propTypes = {};

export default UserMenuNav;
