import React from "react";
import "./recapCart.scss";
import { useTranslation } from 'react-i18next';

function RecapCart(props) {

  const { t } = useTranslation()

  return (
    <div className="recap-container">
      <h2 className="recap-container__header">{ t("recapCart.h2") }</h2>
      <div className="recap-container__total">
        <span>{ t("recapCart.total") }</span> <span className="price">$ { props.total }</span>
        <span className="underline"></span>
      </div>
    </div>
  );
}

export default RecapCart;
