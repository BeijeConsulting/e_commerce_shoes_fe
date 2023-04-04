import React, { useState } from "react";
import PropTypes from "prop-types";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { removeUserCredentials } from "../../../redux/ducks/userDuck";
import { removeToken } from "../../../redux/ducks/tokenDuck";
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
// i18n
import i18n from "../../../assets/translations/i18n";
import { useTranslation } from "react-i18next";
// Library
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// SCSS
import "./userMenuNav.scss";

function UserMenuNav(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const token = useSelector((state) => state.tokenDuck.token)
  const refreshToken = useSelector((state) => state.tokenDuck.refreshToken)
  const userIsLogged = useSelector((state) => state.userDuck.isLogged);
  const userName = useSelector((state) => state.userDuck.name);
  const wishlistItems = useSelector((state) => state.userDuck.wishlistItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();



  const lang = i18n.language.slice(0, 2)
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


  // if user is logged --> screen userInfo
  // if user is not logged --> screen identity
  function conditionalGoTo() {
    props.hideMenuFunc();
    handleClose();
    if (userIsLogged) {
      navigate("area-personale");
    } else {
      navigate("accedi");
    }
  }

  function conditionalGoToCart() {
    props.hideMenuFunc();
    handleClose();
    if (userIsLogged) {
      navigate("area-personale/ordini");
    } else {
      navigate("accedi");
    }
  }

  function conditionalGoToWishList() {
    props.hideMenuFunc();
    handleClose()
    if (userIsLogged) {
      navigate("lista-desideri");
    } else {
      navigate("identity");
    }
  }


  function goToRegistration() {
    props.hideMenuFunc();
    handleClose();
    navigate("accedi/registrati");
  }

  async function userLogOut() {
    const response = await signOut(refreshToken, token);

    if (response.status < 300) {
      console.log("SIGNOUT", response);
      dispatch(removeUserCredentials());
      dispatch(removeToken());
      clearLocalStorage();
      notifyLogOutSuccess();
    } else {
      notifyLogOutError();
    }
  }

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
                <span>{userName.toUpperCase()}</span>
              </p>
            ) : (
              <p onClick={conditionalGoTo} className="item">
                {t("userMenuNav.logIn")}
              </p>
            )}
          </MenuItem>
          <MenuItem onClick={conditionalGoToWishList}>
            <p className="item">WishList</p>
            {userIsLogged && <p className='item__wishlistItems'>{wishlistItems}</p>}

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
