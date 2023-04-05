import React, { useState } from "react";
// import PropTypes from "prop-types";
import { getLocalStorage } from "../../../utils/localStorageUtils";
// Redux
import { useSelector } from "react-redux";
// Router
import { useNavigate } from "react-router-dom";
// Component
import Button from "../../functionalComponents/button/Button";
// MUI
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Divider, IconButton, Menu, MenuItem } from "@mui/material";
// Images
// import shoe from "../../../assets/images/singleProduct/shoe1.jpeg";
//SCSS
import "./cartNavMenu.scss";
import { useTranslation } from "react-i18next";
// import { useTranslation } from "react-i18next";

function CartNavMenu(props) {
  const [state, setState] = useState({
    anchorEl: null,
    itemCartList: getCartStoredList(),
  });

  const cartQuantity = useSelector((state) => state.userDuck.cartItems);
  // console.log("CARTQUANTITY" + cartQuantity);

  const { t } = useTranslation();

  const navigate = useNavigate();

  function getCartStoredList() {
    const storage = getLocalStorage("cart-list");

    if (!storage) {
      const initCartList = {
        numberItems: 0,
        totalPrice: "0.00",

        items: [],
      };

      // setLocalStorage("cart-list", initCartList);
      return structuredClone(initCartList);
    }
    return structuredClone(storage);
  }
  function handleClose() {
    setState({
      ...state,
      anchorEl: null,
    });
  }

  function handleMenu(event) {
    setState({
      ...state,
      anchorEl: event.currentTarget,
      itemCartList: getCartStoredList(),
    });
  }

  function goToCart() {
    props.hideMenuFunc();
    navigate("carrello");
  }

  // const dataProducts = [
  //   {
  //     name: "Nike Air Zoom",
  //     brand: "Nike",
  //     listedPrice: 199.0,
  //     sellingPrice: 40.0,
  //     productSize: "M41",
  //     quantity: 1,
  //   },
  //   {
  //     name: "Nike Air Zoom",
  //     brand: "Nike",
  //     listedPrice: 199.0,
  //     sellingPrice: 40.0,
  //     productSize: "M41",
  //     quantity: 1,
  //   },
  // ];

  function mapList(item) {
    return (
      <div key={"00" + item.productId + item.size}>
        <MenuItem>
          <div className="cartNavMenu__menu">
            <div className="cartNavMenu__image">
              <img src={item.image} alt="product" />
            </div>
            <div className="cartNavMenu__info">
              <div className="cartNavMenu__info-name-price">
                <h3>{item.name}</h3>
                <div className="container__price">
                  <p className="newPrice">
                    € {Number(item.sellingItemTotalPrice).toFixed(2)}
                  </p>
                  {/* <p className="oldPrice">{data.listedPrice}$</p> */}
                </div>
              </div>
              <p className="brand">{item.brand}</p>
              <div className="container__size-cartQuantity">
                <p className="infoSize">
                  {t("cartNavMenu.size")}: {item.size}
                </p>
                <p className="quantity">
                  {t("cartNavMenu.quantity")}: {item.quantity}
                </p>
              </div>
            </div>
          </div>
        </MenuItem>
      </div>
    );
  }

  return (
    <div className="cartMenuNav">
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Badge badgeContent={cartQuantity} color="primary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={state.anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: 66,
        }}
        keepMounted
        transformOrigin={{
          vertical: -30,
          horizontal: "right",
        }}
        open={Boolean(state.anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <h2>{t("cartNavMenu.cart")}</h2>
        </MenuItem>

        {/* Qui bisogna fare il map di tutti i prodotti che l'utente aggiunge */}
        {state.itemCartList && state.itemCartList.items?.map(mapList)}

        <Divider />

        <MenuItem className="item" onClick={handleClose}>
          <p>
            {t("cartNavMenu.total")}: €{" "}
            {Number(state.itemCartList?.totalPrice ?? 0).toFixed(2)}
          </p>
        </MenuItem>
        <MenuItem className="item" onClick={handleClose}>
          <div className="item__btn">
            <Button
              buttonStyle={"navCartBtn"}
              label={t("cartNavMenu.cart")}
              handleClick={goToCart}
            />
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

CartNavMenu.defaultProps = {};

CartNavMenu.propTypes = {};

export default CartNavMenu;
