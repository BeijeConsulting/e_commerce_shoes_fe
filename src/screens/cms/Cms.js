import Seo from "../../components/functionalComponents/Seo";
import BoxImage from '../../components/hookComponents/boxImage/BoxImage';
import ProductSlider from '../../components/hookComponents/productSlider/ProductSlider';

import SliderHomepage from '../../components/hookComponents/sliderHomepage/SliderHomepage';

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
          <BoxImage />
          <ProductSlider />
        </div>

      </div>
    </div>
  );
}

export default Cms;
