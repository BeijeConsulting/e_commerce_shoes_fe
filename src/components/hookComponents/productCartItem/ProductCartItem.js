import React, { useState, useRef, useEffect } from "react";
import "./productCartItem.scss";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
// import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function ProductCartItem(props) {
  // const isLogged = useSelector((state) => state.userDuck.isLogged);
  const [state, setState] = useState({
    quantity: props.quantity,
    showConfirmQuantity: false,
  });

  const { t } = useTranslation();

  useEffect(() => {
    // console.log(state);
  });
  const inputField = useRef();

  const singleProductPrice = Number(
    Number(props.price) / Number(props.quantity)
  ).toFixed(2);

  function deleteItem() {
    props.handleDelete(
      props.id,
      props.productId,
      props.size,
      props.quantity,
      props.price
    );
  }

  function handleInput() {
    const isInvalidInput =
      Number(inputField.current.value) <= 0 ||
      isNaN(Number(inputField.current.value));
    // console.log(Number(inputField.current.value));
    let quantity = isInvalidInput ? props.quantity : inputField.current.value;

    if (!isInvalidInput) {
      const deltaQuantity = Number(quantity) - Number(props.quantity);
      const deltaPrice = Number(
        Number(singleProductPrice) * Number(deltaQuantity)
      ).toFixed(2);
      // console.log("deltaQuantity ", deltaQuantity);
      // console.log("deltaPrice", deltaPrice);
      props.handleList(
        props.id,
        props.productId,
        props.size,
        deltaQuantity,
        deltaPrice
      );
    }

    setState({
      ...state,
      quantity: quantity,
      showConfirmQuantity: false,
    });
  }

  function setQuantity(e) {
    let showConfirmQuantity =
      e.target.value === props.quantity.toString() ? false : true;

    setState({
      ...state,
      quantity: e.target.value,
      showConfirmQuantity: showConfirmQuantity,
    });
  }

  return (
    <article className="cart-item">
      <img className="cart-item__img" src={props.img} alt={props.altImg} />

      <div className="cart-item__info">
        <div className="cart-item__info__price">€ {props.price}</div>
        <div className="cart-item__info__name">{props.productName}</div>
        <div className="cart-item__info__brand">{props.brand}</div>
        <div className="cart-item__info__color-size">
          <span>{props.color}</span>
          <span>{props.size}</span>
        </div>
        <div className="cart-item__info__quantity">
          <span>{t("productCartItem.quantity")}</span>{" "}
          <input
            ref={inputField}
            value={state.quantity}
            type={"number"}
            onChange={setQuantity}
            min={1}
          />
          {state.showConfirmQuantity && (
            <div className="confirm" onClick={handleInput}>
              <CheckIcon fontSize="large" />
            </div>
          )}
        </div>
      </div>
      <div className="cart-item__delete">
        <CloseIcon className="cart-item__delete__icon" onClick={deleteItem} />
      </div>
    </article>
  );
}

export default ProductCartItem;
