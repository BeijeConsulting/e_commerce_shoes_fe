import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import productCardImg from "../../../assets/images/productCardImg.jpg"
import ProductCard from "../../functionalComponents/ProductCard/ProductCard";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import "./productSlider.scss"

// Import Swiper styles
import { Navigation, Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


function ProductSlider() {

    const swiperNavNextRef = useRef(null)
    const swiperNavPrevRef = useRef(null)


    return (
        <div className='container__slide'>
            <div className='container__slide--h2'>
                <h2>Titolo</h2>
            </div>

            <Swiper
                slidesPerView={ 1 }
                spaceBetween={ 10 }
                pagination={ {
                    clickable: true,
                } }

                navigation={ {
                    nextEl: swiperNavNextRef.current,
                    prevEl: swiperNavPrevRef.current
                } }

                breakpoints={ {
                    300: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    900: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    }
                } }
                modules={ [Pagination, Navigation] }

                onInit={ (swiper) => {
                    swiper.params.navigation.nextEl = swiperNavNextRef.current;
                    swiper.params.navigation.prevEl = swiperNavPrevRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                } }

                className="slider"
            >


                <SwiperSlide className='productSlider__slide'>
                    <ProductCard
                        image={ productCardImg }
                        brand={ "Nike" }
                        name={ "Nike Zoom" }
                        category={ "sneakers" }
                        initialPrice={ "199.00" }
                        price={ "99.90" }

                    />
                </SwiperSlide>

                <SwiperSlide className='productSlider__slide'>
                    <ProductCard
                        image={ productCardImg }
                        brand={ "Nike" }
                        name={ "Nike Zoom" }
                        category={ "sneakers" }
                        initialPrice={ "199.00" }
                        price={ "99.90" }
                    />
                </SwiperSlide>

                <SwiperSlide className='productSlider__slide'>
                    <ProductCard
                        image={ productCardImg }
                        brand={ "Nike" }
                        name={ "Nike Zoom" }
                        category={ "sneakers" }
                        initialPrice={ "199.00" }
                        price={ "99.90" }
                    />
                </SwiperSlide>

                <SwiperSlide className='productSlider__slide'>
                    <ProductCard
                        image={ productCardImg }
                        brand={ "Nike" }
                        name={ "Nike Zoom" }
                        category={ "sneakers" }
                        initialPrice={ "199.00" }
                        price={ "99.90" }
                    />
                </SwiperSlide>

                <div className="swiperNavNext"
                    ref={ swiperNavPrevRef }
                >
                    < BsFillArrowLeftCircleFill />
                </div>
                <div className="swiperNavPrev"
                    ref={ swiperNavNextRef }
                >
                    < BsFillArrowRightCircleFill />
                </div>

            </Swiper>
        </div>


    )
}

export default ProductSlider