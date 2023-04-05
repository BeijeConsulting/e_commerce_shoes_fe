import React from "react";
// import PropTypes from 'prop-types';

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// Router
import { useNavigate } from "react-router-dom";
// i18n
import { useTranslation } from "react-i18next";
// Components
import Button from "../../functionalComponents/button/Button";

// SCSS
import "./sliderHomepage.scss";

function SliderHomepage(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function goToNewArrivals() {
    navigate("scarpe/novita");
  }

  function goToConverse() {
    navigate("brand/converse");
  }

  function goToUnisexSneakers() {
    navigate("scarpe/unisex/sneakers");
  }

  return (
    <div>
      <Swiper
        pagination={props.pagination}
        navigation={props.navigation}
        autoplay={props.autoplay}
        modules={[Pagination, Navigation, Autoplay]}
      >
        <SwiperSlide className="swiperSlide">
          <picture>
            <source
              media="(max-width:650px)"
              srcSet={"https://www.cisalfasport.it/on/demandware.static/-/Library-Sites-CisalfaSharedLibrary/default/dw1f869748/1-HP/febbraio-marzo-aprile-23/NUOVIARRIVI-PE23-LIFESTYLE-1000x1775px.jpg"}
            />
            <img
              src={"https://www.cisalfasport.it/on/demandware.static/-/Library-Sites-CisalfaSharedLibrary/default/dwb0c53486/1-HP/febbraio-marzo-aprile-23/NUOVIARRIVI-PE23-LIFESTYLE-hero-hp-desktop-1440x1113px.jpg"}
              alt="sneakers"
            />
          </picture>
          <div className="swiperSlide__info">
            <div className="swiperSlide__info--link">
              <h2 onClick={goToNewArrivals}>
                {t("sliderHomepage.newArrivals")}
              </h2>
            </div>
            <Button
              label={t("sliderHomepage.lookNow")}
              buttonStyle={"default-button"}
              handleClick={goToNewArrivals}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <picture>
            <source
              media="(max-width:650px)"
              srcSet={"https://www.cisalfasport.it/on/demandware.static/-/Library-Sites-CisalfaSharedLibrary/default/dw78769d90/1-HP/febbraio-marzo-aprile-23/SS23_HIKE_CONVERSE_PE23_hero-hp-tablet-mobile-1000x1775px.jpg"}
            />
            <img
              src={"https://www.cisalfasport.it/on/demandware.static/-/Library-Sites-CisalfaSharedLibrary/default/dw47222ebc/1-HP/febbraio-marzo-aprile-23/SS23_HIKE_CONVERSE_PE23_hero-hp-desktop-1440x1113px.jpg"}
              alt="nuovi arrivi"
            />
          </picture>
          <div className="swiperSlide__info">
            <div className="swiperSlide__info--link">
              <h2 onClick={goToConverse}>
                {t("sliderHomepage.conversePromo")}
              </h2>
            </div>
            <Button
              label={t("sliderHomepage.lookNow")}
              buttonStyle={"default-button"}
              handleClick={goToConverse}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <picture>
            <source
              media="(max-width:650px)"
              srcSet={"https://www.cisalfasport.it/on/demandware.static/-/Library-Sites-CisalfaSharedLibrary/default/dw3ea46911/1-HP/febbraio-marzo-aprile-23/PROMORUNNING_PE23_hero-hp-tablet-mobile-1000x1775px.jpg"}
            />
            <img
              src={"https://www.cisalfasport.it/on/demandware.static/-/Library-Sites-CisalfaSharedLibrary/default/dwfee471aa/1-HP/febbraio-marzo-aprile-23/PROMORUNNING_PE23-hero-hp-desktop-1440x1113px.jpg"}
              alt="nuovi arrivi"
            />
          </picture>
          <div className="swiperSlide__info">
            <div className="swiperSlide__info--link">
              <h2 onClick={goToUnisexSneakers}>
                {t("sliderHomepage.theBest")}
              </h2>
            </div>
            <Button
              label={t("sliderHomepage.lookNow")}
              buttonStyle={"default-button"}
              handleClick={goToUnisexSneakers}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SliderHomepage;
