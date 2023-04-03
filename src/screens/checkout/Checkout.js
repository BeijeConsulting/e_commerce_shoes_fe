import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import "./checkout.scss";

import RecapCart from "../../components/functionalComponents/recapCart/RecapCart";
import Button from "../../components/functionalComponents/button/Button";
import CheckoutProduct from "../../components/functionalComponents/checkoutProduct/CheckoutProduct";
import Seo from "../../components/functionalComponents/Seo";
import { useSelector } from "react-redux";

function Checkout() {
  // const location = useLocation();
  const [state, setState] = useState({
    address_id: null,
    payment_status: "string",
    status: "string",
  });

  useEffect(() => console.log(state));

  const location = useLocation();
  const orderData = location.state;
  const userAddresses = useSelector((state) => state.userDuck.adresses);

  console.log(orderData);

  const setDeliveriAddress = (addressId) => () => {
    setState({
      ...state,
      address_id: addressId,
    });
  };

  function renderProductsList(item) {
    return (
      <CheckoutProduct
        key={item.item_id}
        productSrc={item.image}
        productAlt={item.name}
        productPrice={item.sellingItemTotalPrice}
        productName={item.name}
        productColor={item.brand} //FIX PROP
        productSize={item.size}
        productQuantity={item.quantity}
      />
    );
  }

  function renderAddressList(address, key) {
    return (
      <li key={address.id} className="__delivery-address">
        <label htmlFor={`delivery-address-${key}`}>
          <address>
            <p>
              <strong className="__name">casa</strong>
              <br />
            </p>
            <p>{address.name_surname}</p>
            <p>{address.country}</p>
            <p>{address.zipcode} - Mettere city</p>
            <p>{address.street_address}</p>
            {address.instructions && <p>{address.instructions}</p>}
          </address>
        </label>
        <input
          type={"radio"}
          name="delivery-address"
          id={`delivery-address-${key}`}
          onChange={setDeliveriAddress(address.id)}
        />
      </li>
    );
  }

  function submitOrder() {
    console.log("ordine confermato", state.order);
  }

  return (
    <div className="checkout">
      <Seo title="Checkout" description="Checkout" content="e-commerce" />
      <header>
        <img
          src={require("../../assets/images/logo/logo-312.png")}
          alt="logo"
        />
        <h1>CHECKOUT</h1>
        <img
          src={require("../../assets/images/digicert.png")}
          alt="digicert logo"
        />
      </header>

      <div className="__checkout-content">
        <div className="__left">
          <div className="__container">
            <h2>indirizzo di spedizione</h2>
            <ul>
              {userAddresses.map(renderAddressList)}
              {/* <li className="__delivery-address">
                <label htmlFor="delivery-address-1">
                  <address>
                    <p>
                      <strong className="__name">casa</strong>
                      <br />
                    </p>
                    <p>Nome Cognome</p>
                    <p>Italia</p>
                    <p>00402 - Roma</p>
                    <p>Via quella bella, 45</p>
                    <p>Lasciare al portiere</p>
                  </address>
                </label>
                <input
                  type={"radio"}
                  name="delivery-address"
                  id="delivery-address-1"
                />
              </li> */}
            </ul>
            <a className="__add-address">Aggiungi un nuovo indirizzo</a>
          </div>
          <div className="__container">
            <h2>opzioni di pagamento</h2>
            <ul>
              <li className="__payment-method">
                <input
                  type={"radio"}
                  name="payment-methods"
                  id="payment-methods-1"
                />
                <label htmlFor="payment-methods-1">
                  <img
                    src={require("../../assets/images/payments/mastercard.png")}
                    alt={"mastercard logo"}
                  />
                  <p>Carta di credito **** 1234</p>
                </label>
              </li>
              <li className="__payment-method">
                <input
                  type={"radio"}
                  name="payment-methods"
                  id="payment-methods-2"
                />
                <label htmlFor="payment-methods-2">
                  <img
                    src={require("../../assets/images/payments/paypal.png")}
                    alt={"paypal logo"}
                  />
                  <p>PayPal</p>
                </label>
              </li>
              <li className="__payment-method">
                <input
                  type={"radio"}
                  name="payment-methods"
                  id="payment-methods-3"
                />
                <label htmlFor="payment-methods-3">
                  <img
                    src={require("../../assets/images/payments/klarnainstalments.png")}
                    alt={"klarna logo"}
                  />
                  <p>Paga in 3 rate con Klarna</p>
                </label>
              </li>
            </ul>
          </div>
          <Button
            handleClick={submitOrder}
            label={"ACQUISTA ORA"}
            buttonStyle={"filter-button"}
          />
        </div>
        <div className="__right">
          <div className="__container">
            <h2>{orderData.dataCart.numberItems} prodotti</h2>
            {/* <CheckoutProduct
              productSrc={
                "https://images.asos-media.com/products/asos-design-occhiali-da-sole-neri-retro-con-lenti-fume/8064078-1-black?$s$"
              }
              productAlt={"lala"}
              productPrice={35.22}
              productName={
                "ASOS DESIGN - Occhiali da sole neri rétro con lenti fumé"
              }
              productColor={"Nero"}
              productSize={"EU 38"}
              productQuantity={2}
            /> */}

            {orderData.dataCart.items.map(renderProductsList)}
          </div>
          <RecapCart
            total={
              Number(orderData.dataCart.totalPrice).toFixed(2) -
              Number(orderData.couponValue).toFixed(2)
            }
          />
          <Button
            handleClick={submitOrder}
            label={"ACQUISTA ORA"}
            buttonStyle={"filter-button"}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
