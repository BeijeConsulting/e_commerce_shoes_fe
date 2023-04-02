import React, { useEffect, useState } from "react";
import "./cart.scss";

import CartHeader from "../../components/functionalComponents/cartHeader/CartHeader";
import CartInfoBox from "../../components/functionalComponents/cartInfoBox/CartInfoBox";
import CouponInput from "../../components/functionalComponents/couponInput/CouponInput";
import RecapCart from "../../components/functionalComponents/recapCart/RecapCart";
import ProductCartItem from "../../components/hookComponents/productCartItem/ProductCartItem";
import { getCartList, getCartListDetail } from "../../services/cartServices";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../utils/localStorageUtils";
import { getProduct } from "../../services/productServices";

import imageProduct from "../../assets/images/singleProduct/shoe1.jpeg";
import Seo from "../../components/functionalComponents/Seo";
import { useTranslation } from 'react-i18next';

const cartList = {
  items: [
    {
      name: "Air Jordan",
      brand: "Nike",
      id: "0012",
      quantity: "2",
      sellingItemTotalPrice: "200.50",
      image: imageProduct,
      size: "42",
    },
    {
      name: "Trainer",
      brand: "Adidas",
      id: "0013",
      quantity: "1",
      sellingItemTotalPrice: "100",
      image: imageProduct,
      size: "43.5",
    },
    {
      name: "Trainer",
      brand: "Adidas",
      id: "0014",
      quantity: "5",
      sellingItemTotalPrice: "500.0",
      image: imageProduct,
      size: "43.5",
    },
  ],
  info: {
    numberItems: "8",
    totalPrice: "800.50",
  },
};

// setLocalStorage("cart-list", cartList);

function Cart() {
  const localData = getCartStoredList();
  const [state, setState] = useState({
    cart: localData,
  });

  const { t } = useTranslation()

  function getCartStoredList() {
    const storage = getLocalStorage("cart-list");

    if (!storage) {
      const initCartList = {
        info: {
          numberItems: 0,
          totalPrice: "0.00",
        },
        items: [],
      };

      setLocalStorage("cart-list", initCartList);
      return structuredClone(initCartList);
    }
    return structuredClone(storage);
  }

  function deleteItem(id, size, quantity, price) {
    const itemToDelete = localData.items.find((item) => {
      return item.id === id && item.size === size;
    });

    const indexElementToDelete = localData.items.indexOf(itemToDelete);
    localData.items.splice(indexElementToDelete, 1);
    // console.log(localData);

    localData.info.numberItems = Number(localData.info.numberItems) - quantity;
    localData.info.totalPrice = Number(localData.info.totalPrice) - price;

    setLocalStorage("cart-list", localData);

    setState({
      ...state,
      cart: localData,
    });
  }

  function updateCartList(id, size, deltaQuantity, deltaPrice) {
    // console.log(id);
    // console.log(localData);

    const itemChanged = localData.items.find((item) => {
      return item.id === id && item.size === size;
    });

    // console.log("localData.info.numberItems: " + localData.info.numberItems);
    // console.log("deltaQuantity: " + deltaQuantity);
    // console.log("deltaPrice: " + deltaPrice);
    // console.log("itemCanged.quantity: " + itemChanged.quantity);

    itemChanged.quantity = Number(itemChanged.quantity) + Number(deltaQuantity);
    itemChanged.sellingItemTotalPrice =
      Number(itemChanged.sellingItemTotalPrice) + Number(deltaPrice);
    localData.info.numberItems =
      Number(localData.info.numberItems) + Number(deltaQuantity);
    localData.info.totalPrice =
      Number(localData.info.totalPrice) + Number(deltaPrice);
    // console.log(localData);

    // console.log("localData.info.numberItems: " + localData.info.numberItems);
    // console.log("itemCanged.quantity: " + itemChanged.quantity);
    // console.log("---------------------------");

    setLocalStorage("cart-list", localData);

    setState({
      ...state,
      cart: localData,
    });
  }

  function renderCartList(item) {
    return (
      <li key={ item.id + item.size }>
        <ProductCartItem
          handleList={ updateCartList }
          handleDelete={ deleteItem }
          id={ item.id }
          productName={ item.name }
          brand={ item.brand }
          price={ Number(item.sellingItemTotalPrice).toFixed(2) }
          quantity={ item.quantity }
          color={ item.color }
          size={ item.size }
          img={ item.image }
        />
      </li>
    );
  }

  function checkCoupon() {
    console.log("check coupon");
  }

  return (
    <div className="cart">
      <Seo
        title={ t("cart.title") }
        description="Gestione del carrello"
        content="e-commerce"
      />
      <CartHeader
        quantity={ state.cart.info.numberItems }
        totalPrice={ Number(state.cart.info.totalPrice).toFixed(2) }
      />
      <div className="cart__content">
        <div className="cart__content__left">
          <ul>{ state.cart.items.map(renderCartList) }</ul>
          <CouponInput handleCoupon={ checkCoupon } />
        </div>
        <div className="cart__content__right">
          <RecapCart total={ Number(state.cart.info.totalPrice).toFixed(2) } />
          <CartInfoBox />
        </div>
      </div>
    </div>
  );
}

export default Cart;
