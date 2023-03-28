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

setLocalStorage("cart-list", cartList);

function Cart() {
  const localData = getCartStoredList();
  const [state, setState] = useState({
    cart: localData,
  });

  function getCartStoredList() {
    // console.log(getLocalStorage("cart-list"));
    if (!getLocalStorage("cart-list")) return [];

    return getLocalStorage("cart-list");
  }

  //   useEffect(() => {
  //     async function fetchData() {
  //       const response = await getCartList(getLocalStorage("token"));
  //       //   console.log(response);
  //     }

  //     fetchData();
  //   }, []);

  //   function renderCartList(item, index) {
  //     return (
  //       <li key={index}>
  //         <ProductCartItem />
  //       </li>
  //     );
  //   }

  function deleteItem(id, size, quantity, price) {
    const itemToDelete = localData.items.find((item) => {
      return item.id === id && item.size === size;
    });

    const indexElementToDelete = localData.items.indexOf(itemToDelete);
    localData.items.splice(indexElementToDelete, 1);
    console.log(localData);

    localData.info.numberItems = Number(localData.info.numberItems) - quantity;
    localData.info.totalPrice = Number(localData.info.totalPrice) - price;

    setLocalStorage("cart-list", localData);

    setState({
      ...state,
      cart: localData,
    });
  }

  function updateCartList(id, size, deltaQuantity, deltaPrice) {
    console.log(id);
    // console.log(localData);

    const itemChanged = localData.items.find((item) => {
      return item.id === id && item.size === size;
    });

    console.log(localData.info.numberItems);

    itemChanged.quantity = Number(itemChanged.quantity) + deltaQuantity;
    itemChanged.sellingItemTotalPrice =
      Number(itemChanged.sellingItemTotalPrice) + deltaPrice;
    localData.info.numberItems =
      Number(localData.info.numberItems) + deltaQuantity;
    localData.info.totalPrice = Number(localData.info.totalPrice) + deltaPrice;
    // console.log(localData);

    setLocalStorage("cart-list", localData);

    setState({
      ...state,
      cart: localData,
    });
  }

  function renderCartList(item) {
    return (
      <li key={item.id + item.size}>
        <ProductCartItem
          handleList={updateCartList}
          handleDelete={deleteItem}
          id={item.id}
          productName={item.name}
          brand={item.brand}
          price={Number(item.sellingItemTotalPrice).toFixed(2)}
          quantity={item.quantity}
          color={item.color}
          size={item.size}
          img={item.image}
        />
      </li>
    );
  }

  return (
    <div className="cart">
      <CartHeader
        quantity={state.cart.info.numberItems}
        totalPrice={Number(state.cart.info.totalPrice).toFixed(2)}
      />
      <div className="cart__content">
        <div className="cart__content__left">
          <ul>{state.cart.items.map(renderCartList)}</ul>
          <CouponInput />
        </div>
        <div className="cart__content__right">
          <RecapCart total={Number(state.cart.info.totalPrice).toFixed(2)} />
          <CartInfoBox />
        </div>
      </div>
    </div>
  );
}

export default Cart;
