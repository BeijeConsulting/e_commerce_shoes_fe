import React, { useState, useEffect } from "react";
import "./home.scss";

// Components
import SliderHomepage from "../../components/hookComponents/sliderHomepage/SliderHomepage";
import BoxImage from "../../components/hookComponents/boxImage/BoxImage";
import ProductSlider from "../../components/hookComponents/productSlider/ProductSlider";

// Images
import CategoryCard from "../../components/hookComponents/categoryCard/CategoryCard";
import Seo from "../../components/functionalComponents/Seo";
import { getProductsList } from "../../services/productServices";
import i18n from "../../assets/translations/i18n";
import { useTranslation } from "react-i18next";

function Home() {
  const lang = i18n.language.slice(0, 2);
  const { t } = useTranslation();
  const [state, setState] = useState({
    men: [],
    woman: [],
    unisex: [],
  });

  useEffect(() => {
    fetchProducts();
  }, [lang]);

  async function fetchProducts() {
    const men = await getProductsList(1, lang, "?type=m&orderBy=date", 8);
    const woman = await getProductsList(1, lang, "?type=w&orderBy=date", 8);
    const unisex = await getProductsList(1, lang, "?type=m&orderBy=date", 8);
    // console.log(men.data)
    setState({
      ...state,
      men: men.data?.products,
      woman: woman.data?.products,
      unisex: unisex.data?.products,
    });
  }

  return (
    <div className="homepage">
      <Seo
        title="Belle Scarpe"
        description="E-commerce di scarpe italiane"
        content="e-commerce"
      />
      <SliderHomepage pagination={true} navigation={true} autoplay={true} />
      <div className="homepage__category-cards">
        <CategoryCard
          typology={t("header.man")}
          goTo={"scarpe/uomo"}
          imageAlt={t("header.man")}
          image={
            "https://www.cisalfasport.it/on/demandware.static/-/Library-Sites-CisalfaSharedLibrary/default/dw293de7bc/1-HP/febbraio-marzo-aprile-23/3boxes/3boxes-2023-btm-mobile-uomo-640x360px.jpg"
          }
        />
        <CategoryCard
          typology={t("header.woman")}
          goTo={"scarpe/donna"}
          imageAlt={t("header.woman")}
          image={
            "https://www.cisalfasport.it/on/demandware.static/-/Library-Sites-CisalfaSharedLibrary/default/dw429bc565/1-HP/febbraio-marzo-aprile-23/3boxes/3boxes-2023-btm-mobile-donna-640x360px.jpg"
          }
        />
        <CategoryCard
          typology={"unisex"}
          goTo={"scarpe/unisex"}
          imageAlt={"unisex"}
          image={
            "https://www.cisalfasport.it/on/demandware.static/-/Library-Sites-CisalfaSharedLibrary/default/dw51336d7f/1-HP/febbraio-marzo-aprile-23/3boxes/3boxes-2023-btm-mobile-bimbo-640x360px.jpg"
          }
        />
      </div>
      <div className="homepage__category-sliders">
        <div className="homepage__category-sliders__slider">
          <BoxImage
            goTo={"scarpe/uomo"}
            boxTitle={t("header.man")}
            image={"https://www.cisalfasport.it/on/demandware.static/-/Library-Sites-CisalfaSharedLibrary/default/dwaef9454f/3-UOMO/febbraio-marzo-aprile-23/hero/hero-sh-desktop-960x815-napa-23.jpg"}
          />
          <ProductSlider
            products={state.men}
            sliderTitle={t("sliderHomepage.newArrivals")}
          />
        </div>
        <div className="homepage__category-sliders__slider">
          <BoxImage
            goTo={"scarpe/donna"}
            boxTitle={t("header.woman")}
            image={"https://www.cisalfasport.it/on/demandware.static/-/Library-Sites-CisalfaSharedLibrary/default/dwc6fd68ca/4-DONNA/ottobre-novembre-dicembre21/widget/widget-blazer-DONNA.jpg"}
          />
          <ProductSlider
            products={state.woman}
            sliderTitle={t("sliderHomepage.newArrivals")}
          />
        </div>
        <div className="homepage__category-sliders__slider">
          <BoxImage
            goTo={"scarpe/unisex"}
            boxTitle={"unisex"}
            image={"https://www.cisalfasport.it/on/demandware.static/-/Library-Sites-CisalfaSharedLibrary/default/dw33f510bc/1-HP/febbraio-marzo-aprile-23/widget/PROMORUNNING_PE23_widget3-desktop-720x720px.jpg"}
          />
          <ProductSlider
            products={state.unisex}
            sliderTitle={t("sliderHomepage.newArrivals")}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
