import React from "react";
// import PropTypes from 'prop-types';

// Router
import { useNavigate } from "react-router-dom";
// Components
import Button from "../../functionalComponents/button/Button";
// i18ns
import { useTranslation } from "react-i18next";
// SCSS
import "./boxImage.scss";

function BoxImage(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function goTo() {
    navigate(props.goTo);
  }

  return (
    <div className="box__container" style={{ backgroundImage: `url(${props.image})` }}>
      <div className="box__container__info">
        <h2>{props.boxTitle}</h2>
        <p>{t("boxImage.cta")}</p>

        <Button
          label={t("sliderHomepage.lookNow")}
          buttonStyle={"default-button"}
          handleClick={goTo}
        />
      </div>
    </div>
  );
}

export default BoxImage;
