import React, { useState, useEffect } from "react";
import "./singleProduct.scss";
import PropTypes from "prop-types";

import Button from "../../components/functionalComponents/button/Button";
import SingleProductSlider from "../../components/hookComponents/singleProductSlider/SingleProductSlider";
import InfoProductBox from "../../components/functionalComponents/infoProductBox/InfoProductBox";
import AccordionItem from "../../components/hookComponents/accordionItem/AccordionItem";
import { useDispatch, useSelector } from "react-redux";
import { updateCartQuantity } from "../../redux/ducks/productCartDuck";
import { getProduct } from "../../services/productServices";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const params = useParams();
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.productCartDuck.quantity);

  const [state, setState] = useState(
    {
      product: [],
    }
  )

  useEffect(() => {
    fetchProduct();
  }, []);

  console.log(state.product)

  async function fetchProduct() {
    const product = await axiosGetProduct();
    setState({
      product,
    })
  };

  async function axiosGetProduct() {
    const result = await getProduct(params.id);
    return await result.data;
  }

  function updateCart() {
    dispatch(updateCartQuantity({ quantity: cartQuantity + 1 }));
  }

  return (
    <>
      <div className="single-product">
        <header>
          <div className="header__container">
            <p className="header__category">{state.product.category}</p>
            <p className="header__price">{state.product.listed_price}€</p>
          </div>
          <h2 className="header__brand">{state.product.brand}</h2>
          <p className="header__name">{state.product.name}</p>
        </header>

        <div className="info__container">
          <SingleProductSlider />

          <div className="info">
            {/* DA SISTEMARE */}
            <p className="info__p">Input Select taglie</p>
            <InfoProductBox />

            <Button
              handleClick={updateCart}
              label={"AGGIUNGI AL CARRELLO"}
              buttonStyle={"default-button"}
            />
            <p className="info__p">Tabella Taglie Link</p>
            <AccordionItem />
          </div>
        </div>
      </div>
    </>
  );
}

SingleProduct.defaultProps = {};

SingleProduct.propTypes = {};

export default SingleProduct;
