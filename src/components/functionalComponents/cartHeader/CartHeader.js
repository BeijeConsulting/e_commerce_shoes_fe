import React from "react";
import PropTypes from 'prop-types';


// Router
import { useNavigate } from "react-router-dom";

// Components
import Button from "../button/Button";
// i18n
import { useTranslation } from 'react-i18next';
// SCSS
import "./cartHeader.scss";

function CartHeader(props) {
  const navigate = useNavigate();

  const { t } = useTranslation()

  function goToCheckout() {
    navigate("checkout");
  }

  return (
    <header className="cart-header">
      <div className="__recap">
        <h1>{ t("cartHeader.h1") }</h1>
        <div className="__quantity">{ props.quantity } { t("cartHeader.products") }</div>
      </div>
      <div className="__prices">
        <div className="__before">
          <div className="__text">{ t("cartHeader.instead") }</div>
          <div className="__price">390,87€</div>
        </div>
        <div className="__after">
          <div className="__text">{ t("cartHeader.payOnly") }</div>
          <div className="__price">$ { props.totalPrice }</div>
        </div>
        <div className="__actions">
          <Button
            label={ t("button.goToCheckout") }
            handleClick={ goToCheckout }
            buttonStyle={ "filter-button" }
          />
          <Button buttonStyle={ "filter-button paypal" }>
            <img
              src={ require("../../../assets/images/paypal/PayPal.svg.png") }
            />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default CartHeader;
