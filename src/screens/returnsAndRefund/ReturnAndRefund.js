import React from "react";
// import PropTypes from 'prop-types';

// components
import Seo from "../../components/functionalComponents/Seo";
// i18n
import { useTranslation } from "react-i18next";
// SCSS
import "./returnAndrefund.scss";

function ReturnAndRefund() {
  const { t } = useTranslation();

  return (
    <div className="returns">
      <Seo
        title={t("customerCare.returnsAndRefunds")}
        description="Gestione dei resi e dei rimborsi"
        content="e-commerce"
      />
      <h1>{t("returnAndRefund.h1")}</h1>
      <p>{t("returnAndRefund.p1")}</p>

      <h3>{t("returnAndRefund.h3-1")}</h3>
      <p>{t("returnAndRefund.p2")}</p>
      <p>{t("returnAndRefund.p3")}</p>

      <h3>{t("returnAndRefund.h3-2")}</h3>
      <p>{t("returnAndRefund.p4")}</p>
    </div>
  );
}

export default ReturnAndRefund;
