import React from "react";
// import PropTypes from 'prop-types';
// Components
import Seo from "../../components/functionalComponents/Seo";
// i18n
import { useTranslation } from "react-i18next";
// SCSS
import "./delivery.scss";

function Delivery() {
  const { t } = useTranslation();

  return (
    <div className="delivery">
      <Seo
        title={t("customerCare.delivery")}
        description="Gestione delle spedizioni"
        content="e-commerce"
      />
      <h1>{t("customerCare.delivery")}</h1>
      <h3>{t("delivery.h3")}</h3>
      <p>{t("delivery.p1")}</p>

      <p>{t("delivery.p2")}</p>

      <p>{t("delivery.p3")}</p>

      <p>{t("delivery.p4")}</p>

      <p>{t("delivery.p5")}</p>
    </div>
  );
}

export default Delivery;
