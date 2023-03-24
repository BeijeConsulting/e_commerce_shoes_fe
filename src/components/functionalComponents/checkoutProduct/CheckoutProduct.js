import React from "react";
import "./checkoutProduct.scss";

function CheckoutProduct(props) {
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
                <div>Qtà: <span className="__quantity">{props.productQuantity}</span></div>
            </div>
        </article>
    )
}

export default CheckoutProduct;