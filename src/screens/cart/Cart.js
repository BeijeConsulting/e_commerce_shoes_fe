import React from "react";
import "./cart.scss";

import CartHeader from "../../components/functionalComponents/cartHeader/CartHeader";
import CartInfoBox from "../../components/functionalComponents/cartInfoBox/CartInfoBox";
import CouponInput from "../../components/functionalComponents/couponInput/CouponInput";
import RecapCart from "../../components/functionalComponents/recapCart/RecapCart";
import ProductCartItem from "../../components/hookComponents/productCartItem/ProductCartItem";

function Cart() {
    return (
        <div className="cart">
            <CartHeader />
            <div className="cart__content">
                <div className="cart__content__left">
                    <ProductCartItem />
                    <CouponInput />
                </div>
                <div className="cart__content__right">
                    <RecapCart />
                    <CartInfoBox />
                </div>
            </div>
        </div>
    )
}

export default Cart;