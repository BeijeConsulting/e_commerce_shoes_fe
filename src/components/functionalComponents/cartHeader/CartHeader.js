import React from "react";
import "./cartHeader.scss";
import { useNavigate } from "react-router-dom";

import Button from "../button/Button";
import i18n from "../../../assets/translations/i18n";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../../../utils/localStorageUtils";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function CartHeader(props) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleCheckout() {
    props.handleCheckout();
  }

  function goToCheckout() {
    navigate("checkout");
  }

  return (
    <header className="cart-header">
      <div className="__recap">
        <h1>{t("cartHeader.h1")}</h1>
        <div className="__quantity">
          {props.quantity} {t("cartHeader.products")}
        </div>
      </div>
      <div className="__prices">
        {props.initialPrice > props.totalPrice && (
          <div className="__before">
            <div className="__text">invece di</div>
            <div className="__price">{props.initialPrice} €</div>
          </div>
        )}

        <div className="__after">
          <div className="__text">paghi solo</div>
          <div className="__price">€{props.totalPrice.toFixed(2)}</div>
        </div>
        <div className="__actions">
          <Button
            label={"PROCEDI AL CHECKOUT"}
            handleClick={handleCheckout}
            buttonStyle={"filter-button"}
          />
          <Button buttonStyle={"filter-button paypal"}>
            <img
              src={require("../../../assets/images/paypal/PayPal.svg.png")}
              alt="paypal"
            />
          </Button>
        </div>
      </div>
      <ToastContainer hideProgressBar />
    </header>
  );
}

export default CartHeader;
