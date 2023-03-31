import React from "react";

// Components
import SliderHomepage from "../../components/hookComponents/sliderHomepage/SliderHomepage";
import BoxImage from "../../components/hookComponents/boxImage/BoxImage";
import ProductSlider from "../../components/hookComponents/productSlider/ProductSlider";

// Images
import boxNuoviArrivi from "../../assets/images/box/boxNuoviArrivi.jpeg";
import boxNuoviArriviLifeStyle from "../../assets/images/box/boxNuoviArriviLifestyle.jpeg";
import Seo from "../../components/functionalComponents/Seo";
import ProductCard from "../../components/functionalComponents/ProductCard/ProductCard";
import productCardImg from "../../assets/images/productCardImg.jpg";

const sampleData = [
  {
    id: 1,
    name: "Zoom Rush",
    category: "Corsa",
    brand: "Nike",
    starting_price: 67.0,
    image_preview: "test",
  },
  {
    id: 2,
    name: "All Star",
    category: "Sneakers",
    brand: "Converse",
    starting_price: 31.0,
    image_preview: "",
  },
  {
    id: 3,
    name: "King Pro",
    category: "Calcio",
    brand: "Puma",
    starting_price: 46.0,
    image_preview: "",
  },
  {
    id: 4,
    name: "Ultra Boost",
    category: "Corsa",
    brand: "Adidas",
    starting_price: 52.0,
    image_preview: "/blablabla",
  },
  {
    id: 5,
    name: "Old Skool Pro",
    category: "Skate",
    brand: "Vans",
    starting_price: 70.0,
    image_preview: "/boh",
  },
  {
    id: 6,
    name: "Disruptor Lite",
    category: "Fitness",
    brand: "Fila",
    starting_price: 44.0,
    image_preview: "",
  },
  {
    id: 7,
    name: "Nano X",
    category: "Cross training",
    brand: "Reebok",
    starting_price: 78.0,
    image_preview: "",
  },
  {
    id: 8,
    name: "Fresh Foam Arishi",
    category: "Camminata",
    brand: "New Balance",
    starting_price: 80.0,
    image_preview: "",
  },
  {
    id: 9,
    name: "Gel Sonoma",
    category: "Trail running",
    brand: "Asics",
    starting_price: 100.0,
    image_preview: "",
  },
  {
    id: 10,
    name: "Curry Flow 9",
    category: "Basketball",
    brand: "Under Armour",
    starting_price: 110.0,
    image_preview: "",
  },
];

function Home() {
  return (
    <>
      <Seo
        // lang="it"
        title="Belle Scarpe"
        description="E-commerce di scarpe italiane"
        content="e-commerce"
      />
      <SliderHomepage pagination={true} navigation={true} autoplay={true} />
      <div className="container__boxSlider">
        <BoxImage image={boxNuoviArrivi} />
        <ProductSlider />
      </div>
      <div className="container__boxSlider">
        <ProductSlider />
        <BoxImage image={boxNuoviArriviLifeStyle} />
      </div>
    </>
  );
}

export default Home;
