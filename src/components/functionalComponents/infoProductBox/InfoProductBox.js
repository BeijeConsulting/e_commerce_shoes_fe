import React from "react";
// import PropTypes from 'prop-types';

// Icons
import { FiTruck } from "react-icons/fi";
import { BiPackage } from "react-icons/bi";
// i18n
import { useTranslation } from "react-i18next";
// SCSS
import "./infoProductBox.scss";

function InfoProductBox() {
  const { t } = useTranslation();

  return (
    <div className="infoBox">
      <div className="infoBox__container">
        <span>
          <FiTruck />
        </span>
        <p>{t("infoProductBox.delivery")}</p>
      </div>
      <div className="infoBox__container">
        <span>
          <BiPackage />
        </span>
        <p>{t("infoProductBox.refund")}</p>
      </div>
    </div>
  );
}

export default InfoProductBox;
