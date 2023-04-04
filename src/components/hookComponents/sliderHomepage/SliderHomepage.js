import React from 'react'
import PropTypes from 'prop-types';

// Libraries
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Images
import adidasMobile from "../../../assets/images/mobile/adidas-mobile.jpeg";
import adidasDesktop from "../../../assets/images/desktop/adidas-desktop.jpeg";
import sneakersDesktop from "../../../assets/images/desktop/sneakers-desktop.jpeg"
import sneakersMobile from "../../../assets/images/mobile/sneakers-mobile.jpeg"
import nuoviArriviMobile from "../../../assets/images/mobile/nuoviArrivi-mobile.jpeg";
import nuoviArriviDesktop from "../../../assets/images/desktop/nuoviArrivi-desktop.jpeg"
// Router
import { useNavigate } from 'react-router-dom';
// i18n
import { useTranslation } from 'react-i18next';
// Components
import Button from '../../functionalComponents/button/Button';

// SCSS
import "./sliderHomepage.scss"

function SliderHomepage(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    function goToNewArrivals() {
        navigate("scarpe/novita")
    }

    function goToAdidas() {
        navigate("brand/adidas")
    }

    function goToUnisexSneakers() {
        navigate("scarpe/unisex/sneakers")
    }

    return (
        <div>
            <Swiper
                pagination={ props.pagination }
                navigation={ props.navigation }
                autoplay={ props.autoplay }
                modules={ [Pagination, Navigation, Autoplay] }
            >
                <SwiperSlide className='swiperSlide' >
                    <picture>
                        <source media="(max-width:650px)"
                            srcSet={ require("../../../assets/images/mobile/sneakers-mobile.jpeg") } />
                        <img src={ require("../../../assets/images/desktop/sneakers-desktop.jpeg") } alt="sneakers" />
                    </picture>
                    <div className='swiperSlide__info'>
                        <div className='swiperSlide__info--link'>
                            <h2>{ t("sliderHomepage.newArrivals") }</h2>
                        </div>
                        <Button
                            label={ t("sliderHomepage.lookNow") }
                            buttonStyle={ "default-button" }
                            handleClick={ goToNewArrivals }
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='swiperSlide'>
                    <picture>
                        <source media="(max-width:650px)"
                            srcSet={ require("../../../assets/images/mobile/adidas-mobile.jpeg") } />
                        <img src={ require("../../../assets/images/desktop/adidas-desktop.jpeg") } alt="adidas" />
                    </picture>
                </SwiperSlide>
                <SwiperSlide className='swiperSlide'>
                    <picture>
                        <source media="(max-width:650px)"
                            srcSet={ require("../../../assets/images/mobile/nuoviArrivi-mobile.jpeg") } />
                        <img src={ require("../../../assets/images/desktop/nuoviArrivi-desktop.jpeg") } alt="nuovi arrivi" />
                    </picture>
                    <div className='swiperSlide__info'>
                        <div className='swiperSlide__info--link'>
                            <h2>{ t("sliderHomepage.theBest") }</h2>
                        </div>
                        <Button
                            label={ t("sliderHomepage.lookNow") }
                            buttonStyle={ "default-button" }
                            handleClick={ goToUnisexSneakers }
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

SliderHomepage.defaultProps = {

}

SliderHomepage.propTypes = {

}

export default SliderHomepage;