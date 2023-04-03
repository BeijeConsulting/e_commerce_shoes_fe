import React from 'react'
import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';

import adidasMobile from "../../../assets/images/mobile/adidas-mobile.jpeg";
import adidasDesktop from "../../../assets/images/desktop/adidas-desktop.jpeg";
import sneakersDesktop from "../../../assets/images/desktop/sneakers-desktop.jpeg"
import sneakersMobile from "../../../assets/images/mobile/sneakers-mobile.jpeg"
import nuoviArriviMobile from "../../../assets/images/mobile/nuoviArrivi-mobile.jpeg";
import nuoviArriviDesktop from "../../../assets/images/desktop/nuoviArrivi-desktop.jpeg"

import "./sliderHomepage.scss"

import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { Autoplay, Navigation, Pagination } from 'swiper';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '../../functionalComponents/button/Button';


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
                pagination={props.pagination}
                navigation={props.navigation}
                autoplay={props.autoplay}
                modules={[Pagination, Navigation, Autoplay]}
            >
                <SwiperSlide className='swiperSlide' onClick={goToNewArrivals}>
                    <picture>
                        <source media="(max-width:650px)"
                            srcSet={sneakersMobile} />
                        <img src={sneakersDesktop} alt="sneakers" />
                    </picture>
                    <div className='swiperSlide__info'>
                        <div className='swiperSlide__info--link'>
                            <h2>{t("sliderHomepage.newArrivals")}</h2>
                        </div>
                        <Button
                            label={t("sliderHomepage.lookNow")}
                            buttonStyle={"default-button"}
                            handleClick={goToNewArrivals}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='swiperSlide' onClick={goToAdidas}>
                    <picture>
                        <source media="(max-width:650px)"
                            srcSet={adidasMobile} />
                        <img src={adidasDesktop} alt="adidas" />
                    </picture>
                </SwiperSlide>
                <SwiperSlide className='swiperSlide' onClick={goToUnisexSneakers}>
                    <picture>
                        <source media="(max-width:650px)"
                            srcSet={nuoviArriviMobile} />
                        <img src={nuoviArriviDesktop} alt="nuovi arrivi" />
                    </picture>
                    <div className='swiperSlide__info'>
                        <div className='swiperSlide__info--link'>
                            <h2>{t("sliderHomepage.theBest")}</h2>
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
    )
}

SliderHomepage.defaultProps = {

}

SliderHomepage.propTypes = {

}

export default SliderHomepage;