import React from "react";
// SCSS
import "./checkoutProduct.scss";
import { useTranslation } from "react-i18next";

function CheckoutProduct(props) {
  const { t } = useTranslation();

  return (
    <article className="checkout-product">
      <div className="__image">
        <img src={props.productSrc} alt={props.productAlt} />
      </div>
      <div className="__info">
        <div className="__price">{props.productPrice}€</div>
        <div className="__name">{props.productName}</div>
        <div className="__color-size">
          <div>{props.productColor}</div>
          <div>{props.productSize}</div>
        </div>
        <div>
          {t("checkout.quantity")}:{" "}
          <span className="__quantity">{props.productQuantity}</span>
        </div>
      </div>
    </article>
  );
}

export default CheckoutProduct;
