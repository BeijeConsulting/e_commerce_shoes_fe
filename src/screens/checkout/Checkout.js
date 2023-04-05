import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "./checkout.scss";

import RecapCart from "../../components/functionalComponents/recapCart/RecapCart";
import Button from "../../components/functionalComponents/button/Button";
import CheckoutProduct from "../../components/functionalComponents/checkoutProduct/CheckoutProduct";
import Seo from "../../components/functionalComponents/Seo";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import i18n from "../../assets/translations/i18n";
import { addOrder } from "../../services/orderServices";
import { deleteCartItem } from "../../services/cartServices";
import { setLocalStorage } from "../../utils/localStorageUtils";
import { updateCartQuantity } from "../../redux/ducks/userDuck";
import { useTranslation } from "react-i18next";

function Checkout() {
  const [state, setState] = useState({
    address_id: null,
    paymentMethod: null,
    payment_status: "string",
    status: "string",
  });

  const lang = i18n.language;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // useEffect(() => console.log(state));

  const location = useLocation();
  const orderData = location.state;
  const userAddresses = useSelector((state) => state.userDuck.adresses);

  // console.log("ORDERDATA: ", orderData);

  function notifyAddressError() {
    toast.warning(t("toastify.checkout.addressError"), {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  }
  function notifyPaymentError() {
    toast.warning(t("toastify.checkout.paymentError"), {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  }

  function notifyOrderSuccess() {
    toast.success(t("toastify.checkout.orderSuccess"), {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  }

  function notifyOrderError() {
    toast.error(t("toastify.checkout.orderError"), {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  }

  const setDeliveryAddress = (addressId) => () => {
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
              <strong className="__name">{t("checkout.home")}</strong>
              <br />
            </p>
            <p>{address.name_surname}</p>
            <p>{address.country}</p>
            <p>{address.zipcode}</p>
            <p>{address.street_address}</p>
            {address.instructions && <p>{address.instructions}</p>}
          </address>
        </label>
        <input
          type={"radio"}
          name="delivery-address"
          id={`delivery-address-${key}`}
          onChange={setDeliveryAddress(address.id)}
        />
      </li>
    );
  }

  const handlePaymentMethod = (method) => () => {
    setState({
      ...state,
      paymentMethod: method,
    });
  };

  async function submitOrder() {
    // console.log("state", state);
    if (state.address_id === null) {
      notifyAddressError();
      return;
    }

    if (state.paymentMethod === null) {
      notifyPaymentError();
      return;
    }

    const productOrderList = [];

    orderData.dataCart.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        productOrderList.push(item.productDetailsId);
      }
    });

    const obj = {
      address_id: state.address_id,
      coupon_id: orderData.couponId,
      products: productOrderList,
      payment_status: "paid",
      status: "completed",
      transaction: "00" + (Math.random() * 1000).toString(),
    };

    // console.log("RIEPILOGO OGGETTO DA MANDARE", obj);

    const response = await addOrder(obj);
    // console.log(response);

    if (response.status === 200) {
      notifyOrderSuccess();
      ////////////////////////////
      // console.log("DATACART", orderData.dataCart);
      orderData.dataCart.items.forEach((item) => {
        deleteCartItem(item.item_id);
      });

      setLocalStorage("cart-list", {
        items: [],
        totalPrice: 0,
        numberItems: 0,
      });

      dispatch(updateCartQuantity(0));

      setTimeout(() => {
        navigate(`/${lang}`);
      }, 1500);
    } else {
      notifyOrderError();
    }
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
            <h2>{t("checkout.deliveryAddress")}</h2>
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
            <Link
              to={`/${lang}/area-personale/indirizzi`}
              className="__add-address"
            >
              {t("checkout.newAddress")}
            </Link>
          </div>
          <div className="__container">
            <h2>{t("checkout.paymentOptions")}</h2>
            <ul>
              <li className="__payment-method">
                <input
                  type={"radio"}
                  name="payment-methods"
                  id="payment-methods-1"
                  onChange={handlePaymentMethod("Credit-card")}
                />
                <label htmlFor="payment-methods-1">
                  <img
                    src={require("../../assets/images/payments/mastercard.png")}
                    alt={"mastercard logo"}
                  />
                  <p>{t("checkout.creditCard")} **** 1234</p>
                </label>
              </li>
              <li className="__payment-method">
                <input
                  type={"radio"}
                  name="payment-methods"
                  id="payment-methods-2"
                  onChange={handlePaymentMethod("PayPal")}
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
                  onChange={handlePaymentMethod("Klarna")}
                />
                <label htmlFor="payment-methods-3">
                  <img
                    src={require("../../assets/images/payments/klarnainstalments.png")}
                    alt={"klarna logo"}
                  />
                  <p>{t("checkout.klarna")}</p>
                </label>
              </li>
            </ul>
          </div>
          <Button
            handleClick={submitOrder}
            label={t("checkout.buy")}
            buttonStyle={"filter-button"}
          />
        </div>
        <div className="__right">
          <div className="__container">
            <h2>
              {orderData.dataCart.numberItems} {t("checkout.products")}
            </h2>
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
      <ToastContainer hideProgressBar />
    </div>
  );
}

export default Checkout;
