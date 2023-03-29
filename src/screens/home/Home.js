import React from "react";

// Components
import SliderHomepage from "../../components/hookComponents/sliderHomepage/SliderHomepage";
import BoxImage from "../../components/hookComponents/boxImage/BoxImage";
import ProductSlider from "../../components/hookComponents/productSlider/ProductSlider";

// Images
import boxNuoviArrivi from "../../assets/images/box/boxNuoviArrivi.jpeg";
import boxNuoviArriviLifeStyle from "../../assets/images/box/boxNuoviArriviLifestyle.jpeg";
import Seo from '../../components/functionalComponents/Seo';


function Home() {

  return (
    <>
      <Seo
        // lang="it"
        title="Belle Scarpe"
        description="E-commerce di scarpe italiane"
        content="e-commerce"
      />
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
