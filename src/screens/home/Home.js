import React from "react";

import SliderHomepage from "../../components/hookComponents/sliderHomepage/SliderHomepage";
import BoxImage from "../../components/hookComponents/boxImage/BoxImage";
import ProductSlider from "../../components/hookComponents/productSlider/ProductSlider";

import boxNuoviArriviLifeStyle from "../../assets/images/box/boxNuoviArriviLifestyle.jpeg";
import boxNuoviArrivi from "../../assets/images/box/boxNuoviArrivi.jpeg";

function Home() {
  return (
    <>
      <SliderHomepage
        pagination={ true }
        navigation={ true }
        autoplay={ true }
      />
      <div className="container__boxSlider">
        <BoxImage image={ boxNuoviArrivi } />
        <ProductSlider />
      </div>
      <div className="container__boxSlider">
        <ProductSlider />
        <BoxImage image={ boxNuoviArriviLifeStyle } />
      </div>
    </>
  );
}

export default Home;
