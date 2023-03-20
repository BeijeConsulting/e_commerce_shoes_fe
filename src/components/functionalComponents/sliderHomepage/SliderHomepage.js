import React from 'react'
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
import { Link } from 'react-router-dom';

function SliderHomepage() {
    return (
        <div>
            <Swiper
                pagination={ true }
                navigation={ true }
                autoplay={ {
                    delay: 2500,
                    disableOnInteraction: false,
                } }
                modules={ [Pagination, Navigation, Autoplay] }
            >
                <SwiperSlide className='swiperSlide'>
                    <picture>
                        <source media="(max-width:650px)"
                            srcSet={ adidasMobile } />
                        <img src={ adidasDesktop } alt="adidas" />
                    </picture>
                </SwiperSlide>

                <SwiperSlide className='swiperSlide'>
                    <picture>
                        <source media="(max-width:650px)"
                            srcSet={ sneakersMobile } />
                        <img src={ sneakersDesktop } alt="sneakers" />
                    </picture>
                    <div className='swiperSlide__info'>
                        <Link to={ "/" }>
                            <div className='swiperSlide__info--link'>
                                <p>le migliori</p>
                                <p>sneakers</p>
                            </div>
                        </Link>
                        <button
                            className='swiperSlide__info--btn'>
                            scopri ora
                        </button>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='swiperSlide'>
                    <picture>
                        <source media="(max-width:650px)"
                            srcSet={ nuoviArriviMobile } />
                        <img src={ nuoviArriviDesktop } alt="nuovi arrivi" />
                    </picture>
                    <div className='swiperSlide__info'>
                        <Link to={ "/" }>
                            <div className='swiperSlide__info--link'>
                                <p>le migliori</p>
                                <p>sneakers</p>
                            </div>
                        </Link>
                        <button
                            className='swiperSlide__info--btn'>
                            scopri ora
                        </button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default SliderHomepage;