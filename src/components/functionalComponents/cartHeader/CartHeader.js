import React from "react";
import "./cartHeader.scss";
import { useNavigate } from "react-router-dom";

import Button from "../button/Button";

function CartHeader(props) {
  const navigate = useNavigate();

  function goToCheckout() {
    navigate("/checkout");
  }

  return (
    <header className="cart-header">
      <div className="__recap">
        <h1>il tuo carrello</h1>
        <div className="__quantity">{props.quantity} prodotti</div>
      </div>
      <div className="__prices">
        <div className="__before">
          <div className="__text">invece di</div>
          <div className="__price">390,87€</div>
        </div>
        <div className="__after">
          <div className="__text">paghi solo</div>
          <div className="__price">$ {props.totalPrice}</div>
        </div>
        <div className="__actions">
          <Button
            label={"PROCEDI AL CHECKOUT"}
            handleClick={goToCheckout}
            buttonStyle={"filter-button"}
          />
          <Button buttonStyle={"filter-button paypal"}>
            <img
              src={require("../../../assets/images/paypal/PayPal.svg.png")}
            />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default CartHeader;
