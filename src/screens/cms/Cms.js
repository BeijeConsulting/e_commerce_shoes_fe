import Seo from "../../components/functionalComponents/Seo";

import SliderHomepage from '../../components/functionalComponents/sliderHomepage/SliderHomepage';

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
      </div>
    </div>
  );
}

export default Cms;
