import React from "react";
// import PropTypes from 'prop-types';
import "./contacts.scss";
import { Link } from "react-router-dom";
import Seo from "../../components/functionalComponents/Seo";
import { useTranslation } from "react-i18next";

function Contacts() {
  const { t } = useTranslation();

  return (
    <div className="contacts">
      <Seo
        title={t("customerCare.contacts")}
        description="Tutti i contatti di Belle Scarpe"
        content="e-commerce"
      />
      <h1>{t("customerCare.contacts")}</h1>
      <h3>
        {t("contacts.h3")}
        <span>
          <Link to={"/"}> {t("contacts.span")}.</Link>
        </span>
      </h3>
    </div>
  );
}

export default Contacts;
