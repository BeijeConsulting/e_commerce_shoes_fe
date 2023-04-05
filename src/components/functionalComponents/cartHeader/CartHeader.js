import React from "react";
import "./cartHeader.scss";

import Button from "../button/Button";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

function CartHeader(props) {
  const { t } = useTranslation();

  function handleCheckout() {
    props.handleCheckout();
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
            <div className="__text">{t("cartHeader.instead")}</div>
            <div className="__price">
              {" "}
              € {Number(props.initialPrice).toFixed(2)}
            </div>
          </div>
        )}

        <div className="__after">
          <div className="__text">{t("cartHeader.payOnly")}</div>
          <div className="__price">€ {Number(props.totalPrice).toFixed(2)}</div>
        </div>
        <div className="__actions">
          <Button
            label={t("button.goToCheckout")}
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
