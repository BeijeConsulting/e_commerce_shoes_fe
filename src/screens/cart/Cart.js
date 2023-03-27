import React, { useEffect, useState } from "react";
import "./cart.scss";

import CartHeader from "../../components/functionalComponents/cartHeader/CartHeader";
import CartInfoBox from "../../components/functionalComponents/cartInfoBox/CartInfoBox";
import CouponInput from "../../components/functionalComponents/couponInput/CouponInput";
import RecapCart from "../../components/functionalComponents/recapCart/RecapCart";
import ProductCartItem from "../../components/hookComponents/productCartItem/ProductCartItem";
import { getCartList, getCartListDetail } from "../../services/cartServices";
import { getLocalStorage } from "../../utils/localStorageUtils";
import { getProduct } from "../../services/productServices";

function Cart() {
  const [state, setState] = useState({
    cartItems: [],
  });

  useEffect(() => {
    async function fetchData() {
      console.log("fsdfds");
      const response = await getCartList(getLocalStorage("token"));
      console.log(response.data);

      const product = await getProduct(2, "it");
      console.log("product", product);

      const productCart = await getCartListDetail(2, getLocalStorage("token"));
      console.log(productCart);

      if (response.status === 200) {
        response.data.map(async (item, index) => {
          const product = await getProduct(2, "it");
        });

        setState({
          ...state,
          cartItems: response.data,
        });
      }
    }

    fetchData();
  }, []);

  function renderCartList(item, index) {
    return (
      <li key={index}>
        <ProductCartItem />
      </li>
    );
  }

  return (
    <div className="cart">
      <CartHeader />
      <div className="cart__content">
        <div className="cart__content__left">
          <ul>{state.cartItems.map(renderCartList)}</ul>
          <ProductCartItem />
          <CouponInput />
        </div>
        <div className="cart__content__right">
          <RecapCart />
          <CartInfoBox />
        </div>
      </div>
    </div>
  );
}

export default Cart;
