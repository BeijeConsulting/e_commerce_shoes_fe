import React from "react";
// import PropTypes from "prop-types";

//Router
import { Link } from "react-router-dom";
// i18n
import i18n from "../../../assets/translations/i18n";
// imgaes
// import nikeWhite from "../../../assets/images/wishListCard/nike-white.webp";
// MUI
import { ImCancelCircle } from "react-icons/im";
// SCSS
import "./wishListProductCard.scss";

function WishListProductCard(props) {
  const lang = i18n.language.slice(0, 2);

  function deleteItem() {
    props.handleClick(props.deleteId);
  }

  return (
    <article className="card">
      <Link to={`/${lang}/scarpa/${props.productId}`}>
        <div className="card__container">
          <img
            src={require("../../../assets/images/wishListCard/nike-white.webp")}
            alt={props.name}
          />

          <div className="card__absolute">
            <div className="card__header">
              <div className="card__wrapper">
                <div className="card__price">
                  <p className="card__sellingPrice">
                    € {Number(props.listedPrice).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="card__info">
              <h2>{props.name}</h2>
              <p className="card__brand">{props.brand}</p>

              <div className="card__info--detail">
                <p>{props.color}</p>
                <p>{props.size}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="card__icon">
        <span onClick={deleteItem}>
          <ImCancelCircle />
        </span>
      </div>
    </article>
  );
}

export default WishListProductCard;
