import Seo from "../../components/functionalComponents/Seo";
import BoxImage from '../../components/hookComponents/boxImage/BoxImage';
import ProductSlider from '../../components/hookComponents/productSlider/ProductSlider';

import SliderHomepage from '../../components/hookComponents/sliderHomepage/SliderHomepage';

import boxNuoviArrivi from "../../assets/images/box/boxNuoviArrivi.jpeg";
import boxNuoviArriviLifeStyle from "../../assets/images/box/boxNuoviArriviLifestyle.jpeg";


import "./cms.scss";

function Cms() {
  return (

    <div>
      <Seo
        lang="it"
        title="Pagina principale"
        description="Descrizione pagina principale"
        content="e-commerce"
      />

      <div>
        <SliderHomepage />

        <div className='container__boxSlider'>
          <BoxImage image={ boxNuoviArrivi } />
          <ProductSlider />
        </div>
        <div className='container__boxSlider'>
          <ProductSlider />
          <BoxImage image={ boxNuoviArriviLifeStyle } />
        </div>

      </div>
    </div>
  );
}

export default Cms;
