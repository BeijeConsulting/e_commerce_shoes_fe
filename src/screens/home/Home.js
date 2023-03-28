import React, { useEffect } from "react";

// Components
import SliderHomepage from "../../components/hookComponents/sliderHomepage/SliderHomepage";
import BoxImage from "../../components/hookComponents/boxImage/BoxImage";
import ProductSlider from "../../components/hookComponents/productSlider/ProductSlider";

// Images
import boxNuoviArrivi from "../../assets/images/box/boxNuoviArrivi.jpeg";
import boxNuoviArriviLifeStyle from "../../assets/images/box/boxNuoviArriviLifestyle.jpeg";
import i18n from '../../assets/translations/i18n';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../../utils/localStorageUtils';
import { useSelector } from 'react-redux';
import SwitchLanguage from '../../components/hookComponents/switchLanguage/SwitchLanguage';


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
