import React from "react";
import SingleProductSlider from "../../components/hookComponents/singleProductSlider/SingleProductSlider";
import InfoProductBox from "../../components/functionalComponents/infoProductBox/InfoProductBox";
import { useDispatch } from "react-redux";
import HeaderSingleProduct from "../../components/hookComponents/headerSingleProduct/HeaderSingleProduct";
import { updateCartQuantity } from "../../redux/ducks/productCartDuck";

function SingleProduct() {
  return (
    <div>
      <HeaderSingleProduct />
    </div>
  );
}

export default SingleProduct;
