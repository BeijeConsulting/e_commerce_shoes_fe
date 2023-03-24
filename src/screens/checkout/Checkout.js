import React, { useState } from "react";
import { useLocation } from "react-router";
import "./checkout.scss";

import RecapCart from "../../components/functionalComponents/recapCart/RecapCart";
import Button from "../../components/functionalComponents/button/Button";
import CheckoutProduct from "../../components/functionalComponents/checkoutProduct/CheckoutProduct";

function Checkout() {
    const location = useLocation();
    const [state, setState] = useState({
        order: {
            "address_id": 0,
            "coupon_id": 0,
            "id": 0,
            "payment_status": "string",
            "products": [
                0
            ],
            "status": "string",
            "transaction": "string",
            "transaction_date": "2023-03-24T13:21:14.592Z",
            "user_id": 0
        }
    });

    function submitOrder() {
        console.log('ordine confermato', state.order)
    }

    return (
        <div className="checkout">
            <header>
                <img src={require("../../assets/images/logo/logo-312.png")} alt="logo" />
                <h1>CHECKOUT</h1>
                <img src={require("../../assets/images/digicert.png")} alt="digicert logo" />
            </header>

            <div className="__checkout-content">
                <div className="__left">
                    <div className="__container">
                        <h2>indirizzo di spedizione</h2>
                        <ul>
                            <li className="__delivery-address">
                                <label htmlFor="delivery-address-1">
                                    <address>
                                        <p>
                                            <strong className="__name">casa</strong><br />
                                        </p>
                                        <p>Nome Cognome</p>
                                        <p>Italia</p>
                                        <p>00402 - Roma</p>
                                        <p>Via quella bella, 45</p>
                                        <p>Lasciare al portiere</p>
                                    </address>
                                </label>
                                <input type={'radio'} name="delivery-address" id="delivery-address-1" />
                            </li>
                        </ul>
                        <a className="__add-address">Aggiungi un nuovo indirizzo</a>
                    </div>
                    <div className="__container">
                        <h2>opzioni di pagamento</h2>
                        <ul>
                            <li className="__payment-method">
                                <input type={'radio'} name="payment-methods" id="payment-methods-1" />
                                <label htmlFor="payment-methods-1">
                                    <img src={require("../../assets/images/payments/mastercard.png")} alt={"mastercard logo"} />
                                    <p>Carta di credito **** 1234</p>
                                </label>
                            </li>
                            <li className="__payment-method">
                                <input type={'radio'} name="payment-methods" id="payment-methods-2" />
                                <label htmlFor="payment-methods-2">
                                    <img src={require("../../assets/images/payments/paypal.png")} alt={"paypal logo"} />
                                    <p>PayPal</p>
                                </label>
                            </li>
                            <li className="__payment-method">
                                <input type={'radio'} name="payment-methods" id="payment-methods-3" />
                                <label htmlFor="payment-methods-3">
                                    <img src={require("../../assets/images/payments/klarnainstalments.png")} alt={"klarna logo"} />
                                    <p>Paga in 3 rate con Klarna</p>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <Button handleClick={submitOrder} label={'ACQUISTA ORA'} buttonStyle={'filter-button'} />
                </div>
                <div className="__right">
                    <div className="__container">
                        <h2>10 prodotti</h2>
                        <CheckoutProduct
                            productSrc={'https://images.asos-media.com/products/asos-design-occhiali-da-sole-neri-retro-con-lenti-fume/8064078-1-black?$s$'}
                            productAlt={'lala'}
                            productPrice={35.22}
                            productName={"ASOS DESIGN - Occhiali da sole neri rétro con lenti fumé"}
                            productColor={"Nero"}
                            productSize={"EU 38"}
                            productQuantity={2}
                        />
                    </div>
                    <RecapCart />
                    <Button handleClick={submitOrder} label={'ACQUISTA ORA'} buttonStyle={'filter-button'} />
                </div>
            </div>
        </div>
    );
}

export default Checkout;