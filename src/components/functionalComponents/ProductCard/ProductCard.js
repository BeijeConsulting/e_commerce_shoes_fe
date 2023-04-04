import React from "react";
import "./productCard.scss";
import { useNavigate } from "react-router-dom";
import i18n from "../../../assets/translations/i18n";

function ProductCard(props) {
  const lang = i18n.language.slice(0, 2)
  const navigate = useNavigate();
  function goTo() {
    navigate(`/${lang}/scarpa/${props.idProduct}`)
  }

  return (
    // <Link to={ "/product/" + props.idProduct + `/${t("lang")}` }>
    <article className="product-card" onClick={ goTo }>
      <picture>
        {/* <source media="(min-width:650px)" srcset="img_pink_flowers.jpg" />
        <source media="(min-width:350px)" srcset="img_white_flowers.jpg" /> */}
        <img
          className="product-card__image"
          src={ props.image }
          alt={ props.imageAlt }
        />
      </picture>
      <div className="product-card__info">
        <div className="product-card__info__first-col">
          <h4 className="product-card__info__first-col__category">
            { props.category }
          </h4>
          <h4 className="product-card__info__first-col__brand">
            { props.brand.toUpperCase() }
          </h4>
          <h3 className="product-card__info__first-col__name">
            { props.name.toUpperCase() }
          </h3>
        </div>
        <div className="product-card__info__second-col">
          {/* {props.initialPrice && (
            <div className="product-card__info__second-col__full-price">
              {props.initialPrice}
            </div>
          )} */}
          <div className="product-card__info__second-col__price">
            da { props.price }€
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
