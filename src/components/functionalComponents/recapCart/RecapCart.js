import React from "react";
import "./recapCart.scss";

function RecapCart(props) {
  return (
    <div className="recap-container">
      <h2 className="recap-container__header">RIEPILOGO ORDINE</h2>
      <div className="recap-container__total">
        <span>TOTALE</span> <span className="price">{props.total}</span>
        <span className="underline"></span>
      </div>
    </div>
  );
}

export default RecapCart;
