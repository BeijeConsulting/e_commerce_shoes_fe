import Seo from "../../components/functionalComponents/Seo";
import "./cms.scss";
import CategoryCard from "../../components/hookComponents/categoryCard/CategoryCard";
import image from "../../assets/imgs/manTipology.jpeg";

function Cms() {
  return (
    <div>
      <Seo
        lang="it"
        title="Pagina principale"
        description="Descrizione pagina principale"
        content="e-commerce"
      />
      <CategoryCard
        cssStyle={"default-button"}
        image={image}
        imageAlt="man"
        tipology="Uomo"
        goTo={"/man"}
      />
    </div>
  );
}

export default Cms;
