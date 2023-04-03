import React, { useState } from "react";
import "./cart.scss";

import CartHeader from "../../components/functionalComponents/cartHeader/CartHeader";
import CartInfoBox from "../../components/functionalComponents/cartInfoBox/CartInfoBox";
import CouponInput from "../../components/functionalComponents/couponInput/CouponInput";
import RecapCart from "../../components/functionalComponents/recapCart/RecapCart";
import ProductCartItem from "../../components/hookComponents/productCartItem/ProductCartItem";
import {
  deleteCartItem,
  getCartList,
  updateItemToCartList,
} from "../../services/cartServices";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../utils/localStorageUtils";

// import imageProduct from "../../assets/images/singleProduct/shoe1.jpeg";
import Seo from "../../components/functionalComponents/Seo";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCoupon } from "../../services/orderServices";
import { useNavigate } from "react-router";
import i18n from "../../assets/translations/i18n";
import { updateCartQuantity } from "../../redux/ducks/userDuck";
// const cartList = {
//   items: [
//     {
//       name: "Air Jordan",
//       brand: "Nike",
//       id: "0012",
//       quantity: "2",
//       sellingItemTotalPrice: "200.50",
//       image: imageProduct,
//       size: "42",
//     },
//     {
//       name: "Trainer",
//       brand: "Adidas",
//       id: "0013",
//       quantity: "1",
//       sellingItemTotalPrice: "100",
//       image: imageProduct,
//       size: "43.5",
//     },
//     {
//       name: "Trainer",
//       brand: "Adidas",
//       id: "0014",
//       quantity: "5",
//       sellingItemTotalPrice: "500.0",
//       image: imageProduct,
//       size: "43.5",
//     },
//   ],
//   info: {
//     numberItems: "8",
//     totalPrice: "800.50",
//   },
// };

// setLocalStorage("cart-list", cartList);

function Cart() {
  let localData = getCartStoredList();
  const isLogged = useSelector((state) => state.userDuck.isLogged);
  const cartItemsNumber = useSelector((state) => state.userDuck.cartItems);
  const [state, setState] = useState({
    cart: localData,
    couponValue: 0,
    couponId: null,
  });
  const navigate = useNavigate();
  const lang = i18n.language;
  const dispatch = useDispatch();

  function notifyCartUpdateSuccess() {
    toast.success("Quantità modificata", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }
  function notifyCartUpdateError() {
    toast.error("Errore nella modifica quantità", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }

  function notifydeleteCartItemSuccess() {
    toast.success("Prodotto eliminato", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }
  function notifydeleteCartItemError() {
    toast.error("Errore rimozione prodotto", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }

  function notifyCouponCheckSuccess() {
    toast.success("Sconto applicato", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }

  function notifyCouponInvalidFieldError() {
    toast.warning("Devi inserire un coupon", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }

  function notifyCouponCheckError() {
    toast.error("Coupon non valido", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }

  function notifyNoProductError() {
    toast.error("Non sono presenti prodotti nel carrello", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }

  function notifyNoLogged() {
    toast.warning("Devi effettuare il login", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  }

  function getCartStoredList() {
    const storage = getLocalStorage("cart-list");

    if (!storage) {
      const initCartList = {
        numberItems: 0,
        totalPrice: "0.00",

        items: [],
      };

      // setLocalStorage("cart-list", initCartList);
      return structuredClone(initCartList);
    }
    return structuredClone(storage);
  }

  async function deleteItem(id, productId, size, quantity, price) {
    let itemToDelete = null;

    if (isLogged) {
      itemToDelete = localData.items.find((item) => {
        return item.item_id === id;
      });
    } else {
      itemToDelete = localData.items.find((item) => {
        return item.productId === productId && item.size === size;
      });
    }

    if (isLogged) {
      try {
        const updateCartresponse = await deleteCartItem(itemToDelete.item_id);
        if (updateCartresponse.status === 200) {
          const getUpdate = await getCartList();
          if (getUpdate.status === 200) {
            localData = getUpdate.data;
          }
        }
        dispatch(updateCartQuantity(cartItemsNumber - quantity));
        notifydeleteCartItemSuccess();
      } catch {
        notifydeleteCartItemError();
      }
    } else {
      const indexElementToDelete = localData.items.indexOf(itemToDelete);
      localData.items.splice(indexElementToDelete, 1);
      // console.log(localData);

      localData.numberItems = Number(localData.numberItems) - quantity;
      localData.totalPrice = Number(localData.totalPrice) - price;

      notifydeleteCartItemSuccess();
    }

    setLocalStorage("cart-list", localData);

    setState({
      ...state,
      cart: localData,
    });
  }

  async function updateCartList(
    id,
    productId,
    size,
    deltaQuantity,
    deltaPrice
  ) {
    // console.log(id);
    // console.log(localData);
    let itemChanged = null;
    console.log(id);

    if (isLogged) {
      itemChanged = localData.items.find((item) => {
        return item.item_id.toString() === id.toString();
      });
    } else {
      itemChanged = localData.items.find((item) => {
        return item.productId === productId && item.size === size;
      });
    }

    console.log(itemChanged);

    // console.log("localData.info.numberItems: " + localData.info.numberItems);
    // console.log("deltaQuantity: " + deltaQuantity);
    // console.log("deltaPrice: " + deltaPrice);
    // console.log("itemCanged.quantity: " + itemChanged.quantity);

    itemChanged.quantity = Number(itemChanged.quantity) + Number(deltaQuantity);
    itemChanged.sellingItemTotalPrice =
      Number(itemChanged.sellingItemTotalPrice) + Number(deltaPrice);
    localData.numberItems =
      Number(localData.numberItems) + Number(deltaQuantity);
    localData.totalPrice = Number(localData.totalPrice) + Number(deltaPrice);
    // console.log(localData);

    // console.log("localData.info.numberItems: " + localData.info.numberItems);
    // console.log("itemCanged.quantity: " + itemChanged.quantity);
    // console.log("---------------------------");

    if (isLogged) {
      try {
        console.log("itemChanged", itemChanged.quantity);
        const updateCartresponse = await updateItemToCartList(
          itemChanged.item_id,
          itemChanged.quantity
        );
        if (updateCartresponse.status === 200) {
          const getUpdate = await getCartList();
          if (getUpdate.status === 200) {
            localData = getUpdate.data;
          }
        }
        dispatch(updateCartQuantity(cartItemsNumber + deltaQuantity));
        notifyCartUpdateSuccess();
      } catch {
        notifyCartUpdateError();
      }
    }
    setLocalStorage("cart-list", localData);
    if (!isLogged) notifyCartUpdateSuccess();

    setState({
      ...state,
      cart: localData,
    });
  }

  function renderCartList(item) {
    return (
      <li key={item.productId + item.size}>
        <ProductCartItem
          handleList={updateCartList}
          handleDelete={deleteItem}
          id={item.item_id}
          productId={item.productId}
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

  function handleCheckout() {
    const dataCart = getLocalStorage("cart-list");

    if (!dataCart || dataCart?.items?.length === 0) {
      console.log("No products");
      notifyNoProductError();
      return;
    }

    if (isLogged) {
      navigate(`/${lang}/checkout`, {
        state: {
          dataCart,
          couponValue: state.couponValue,
          couponId: state.couponId,
        },
      });
    } else {
      notifyNoLogged();
      setTimeout(() => {
        navigate(`/${lang}/accedi`);
      }, 1500);
    }
  }

  async function handleCoupon(id) {
    if (id === null || id === undefined || id === "") {
      notifyCouponInvalidFieldError();
      return;
    }

    const response = await getCoupon(id);
    let couponValue = 0;
    let couponId = null;

    if (response.status === 200) {
      notifyCouponCheckSuccess();

      couponValue = response.data.value;
      couponId = response.data.id;
      console.log(couponValue);
    } else {
      notifyCouponCheckError();
    }
    console.log(response);

    setState({
      ...state,
      couponValue: couponValue,
      couponId: couponId,
    });
  }

  return (
    <div className="cart">
      <Seo
        title="Carrello"
        description="Gestione del carrello"
        content="e-commerce"
      />
      <CartHeader
        quantity={state.cart.numberItems}
        initialPrice={Number(state.cart.totalPrice).toFixed(2)}
        totalPrice={
          Number(state.cart.totalPrice).toFixed(2) -
          Number(state.couponValue).toFixed(2)
        }
        handleCheckout={handleCheckout}
      />
      <div className="cart__content">
        <div className="cart__content__left">
          <ul>{state.cart.items.map(renderCartList)}</ul>
          <CouponInput handleCoupon={handleCoupon} />
        </div>
        <div className="cart__content__right">
          <RecapCart
            total={
              Number(state.cart.totalPrice).toFixed(2) -
              Number(state.couponValue).toFixed(2)
            }
          />
          <CartInfoBox />
        </div>
      </div>
      <ToastContainer hideProgressBar />
    </div>
  );
}

export default Cart;
