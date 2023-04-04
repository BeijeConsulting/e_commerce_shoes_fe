import React from "react";
// Router
import { useNavigate, Link } from "react-router-dom";
// i18n
import { useTranslation } from 'react-i18next';
// Components
import Button from "../../functionalComponents/button/Button";
// SCSS
import "./categoryCard.scss";

function CategoryCard(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  function goTo() {
    navigate(props.goTo);
  };

  return (
    <div className="category-card">
      <div className="category-card__content-wrapper">
        <h2 className="category-card__content-wrapper__header">
          <Link
            className="category-card__content-wrapper__header__link"
            to={ props.goTo }
          >
            { " " }
            { props.typology }{ " " }
          </Link>
        </h2>
        <Button
          buttonStyle={ "default-button margin-top" }
          handleClick={ goTo }
          label={ t("sliderHomepage.lookNow") }
        />
      </div>
      <img
        className="category-card__image"
        src={ props.image }
        alt={ props.imageAlt }
      />
    </div>
  );
}

export default CategoryCard;
