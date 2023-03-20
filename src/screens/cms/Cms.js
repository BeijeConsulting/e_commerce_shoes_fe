import Seo from "../../components/functionalComponents/Seo";
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
    </div>
  );
}

export default Cms;
