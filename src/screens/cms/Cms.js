import Seo from "../../components/functionalComponents/Seo";
import "./cms.scss";
import ProductCard from "../../components/functionalComponents/ProductCard/ProductCard";
import productCardImg from "../../assets/images/productCardImg.jpg";

function Cms() {
  return (
    <div>
      <Seo
        lang="it"
        title="Pagina principale"
        description="Descrizione pagina principale"
        content="e-commerce"
      />

      <ProductCard
        image={productCardImg}
        imageAlt="prodotto"
        id="002103"
        name="Air Jordan Max Aura"
        brand="Nike"
        category="sports shoe"
        initialPrice="€ 219.99"
        price="€ 179.99"
      />
    </div>
  );
}

export default Cms;
