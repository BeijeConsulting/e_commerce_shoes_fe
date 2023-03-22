import Seo from "../../components/functionalComponents/Seo";

import BoxImage from "../../components/hookComponents/boxImage/BoxImage";
import ProductSlider from "../../components/hookComponents/productSlider/ProductSlider";
import SliderHomepage from "../../components/hookComponents/sliderHomepage/SliderHomepage";
import boxNuoviArrivi from "../../assets/images/box/boxNuoviArrivi.jpeg";
import boxNuoviArriviLifeStyle from "../../assets/images/box/boxNuoviArriviLifestyle.jpeg";
import PreFooter from "../../components/hookComponents/preFooter/PreFooter";

import "./cms.scss";
import Header from "../../components/hookComponents/header/Header";
import Footer from "../../components/functionalComponents/footer/Footer";
import InputTextField from "../../components/functionalComponents/inputTextField/InputTextField";

import FilterMenu from "../../components/hookComponents/filterMenu/FilterMenu";
import CartHeader from "../../components/functionalComponents/cartHeader/CartHeader";
import CouponInput from "../../components/functionalComponents/couponInput/CouponInput";
import SignupForm from "../../components/hookComponents/signupForm/SignupForm";
import InputPasswordField from "../../components/hookComponents/inputPasswordField/InputPasswordField";
import HeaderSingleProduct from "../../components/hookComponents/headerSingleProduct/HeaderSingleProduct";
import WishListAccordion from "../../components/hookComponents/wishListAccordion/WishListAccordion";
import WishListProductCard from "../../components/hookComponents/wishListProductCard/WishListProductCard";
import CartInfoBox from "../../components/functionalComponents/cartInfoBox/CartInfoBox";

import ProductCartItem from "../../components/hookComponents/productCartItem/ProductCartItem";
import productImg from "../../assets/images/singleProduct/shoe1.jpeg";

import RecapCart from "../../components/functionalComponents/recapCart/RecapCart";

function Cms() {
  return (
    <>
      <RecapCart total="$ 340.00" />
      <ProductCartItem
        img={productImg}
        altImg="productAlt"
        price="$ 169.99"
        productName={"Football shoes"}
        brand={"Nike"}
        quantity={"2"}
      />

      <Seo
        lang="it"
        title="Pagina principale"
        description="Descrizione pagina principale"
        content="e-commerce"
      />

      <WishListProductCard />

      {/* <WishListAccordion /> */}
      <Header />
      <CartHeader />
      <CouponInput />
      <CartInfoBox />
      <WishListAccordion />

      {/* <HeaderSingleProduct /> */}

      {/* <div style={{ marginTop: "100px", marginLeft: "100px", width: "400px" }}>
        <LoginForm />
      </div>
      <InputTextField
      name="password"
        inputLabel="PASSWORD:"
        inputType="password"
        inputPlaceholder="Password"
        labelStyle="default-label password-margin-top"
        inputStyle={`default-input`}
      /> */}
      {/* <div>
        <SliderHomepage />

        <div className="container__boxSlider">
          <BoxImage image={boxNuoviArrivi} />
          <ProductSlider />
        </div>
        <div className="container__boxSlider">
          <ProductSlider />
          <BoxImage image={boxNuoviArriviLifeStyle} />
        </div>
      </div> */}
      {/* <PreFooter /> */}
      {/* </div> */}
      <PreFooter />
      <Footer />
    </>
  );
}
console.log(productImg);

export default Cms;
