import React, { useState } from "react";
import "./productCartItem.scss";
import CheckIcon from "@mui/icons-material/Check";
import { Check } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

function ProductCartItem(props) {
  const [state, setState] = useState({
    quantity: null,
    showConfirmQuantity: false,
  });

  function apiCall() {
    console.log("Cart Item API call");

    /* 1 - Far gestire la chiamata API dal parent in modo che possa aggiornare 
        le props che possa ai children

        2 - Fare la chiamata API direttamente dal children e far fare il re-rendering
        con le props aggiornate da redux
    */

    setState({
      ...state,
      showConfirmQuantity: false,
    });
  }

  function setQuantity(e) {
    let showConfirmQuantity = e.target.value === props.quantity ? false : true;

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
        <div className="cart-item__info__price">{props.price}</div>
        <div className="cart-item__info__name">{props.productName}</div>
        <div className="cart-item__info__brand">{props.brand}</div>
        <div className="cart-item__info__quantity">
          <span>Quantitá</span>{" "}
          <input
            value={!state.quantity ? props.quantity : state.quantity}
            type={"number"}
            onChange={setQuantity}
            min={1}
          />
          {state.showConfirmQuantity && (
            <div className="confirm" onClick={apiCall}>
              <CheckIcon fontSize="large" />
            </div>
          )}
        </div>
      </div>
      <div className="cart-item__delete">
        <CloseIcon className="cart-item__delete__icon" />
      </div>
    </article>
  );
}

export default ProductCartItem;
