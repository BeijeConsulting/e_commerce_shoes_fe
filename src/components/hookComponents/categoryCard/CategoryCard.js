import React from "react";
import "./categoryCard.scss";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../functionalComponents/button/Button";

function CategoryCard(props) {
  const navigate = useNavigate();
  const goTo = function () {
    navigate(props.goTo);
  };

  return (
    <div className="category-card">
      <div className="category-card__content-wrapper">
        <h3 className="category-card__content-wrapper__header">
          <Link
            className="category-card__content-wrapper__header__link"
            to={props.goTo}
          >
            {" "}
            {props.tipology}{" "}
          </Link>
        </h3>
        <Button
          buttonStyle={"default-button"}
          handleClick={goTo}
          label={"Scopri di più"}
        />
      </div>
      <img
        className="category-card__image"
        src={props.image}
        alt={props.imageAlt}
      />
    </div>
  );
}

export default CategoryCard;
