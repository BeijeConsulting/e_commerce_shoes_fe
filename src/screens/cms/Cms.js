import Seo from "../../components/functionalComponents/Seo";
import "./cms.scss";
import Header from '../../components/hookComponents/header/Header';

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
    </>

  );
}

export default Cms;
