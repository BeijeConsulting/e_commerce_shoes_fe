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
import SignupForm from "../../components/hookComponents/signupForm/SignupForm";
import InputPasswordField from "../../components/hookComponents/inputPasswordField/InputPasswordField";
import HeaderSingleProduct from "../../components/hookComponents/headerSingleProduct/HeaderSingleProduct";

function Cms() {
  return (
    <>
      <Seo
        lang="it"
        title="Pagina principale"
        description="Descrizione pagina principale"
        content="e-commerce"
      />


      <Header />
      <CartHeader />

      <HeaderSingleProduct />

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

export default Cms;
