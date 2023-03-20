import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import productCardImg from "../../../assets/images/productCardImg.jpg"
import ProductCard from "../../functionalComponents/ProductCard/ProductCard";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import "./productSlider.scss"
import { Navigation, Pagination } from 'swiper';

function ProductSlider() {
    return (
        <Swiper
            // style={ {
            //     "--swiper-navigation-size": "25px",
            // } }
            slidesPerView={ 1 }
            spaceBetween={ 10 }
            pagination={ {
                clickable: true,
            } }
            navigation={ true }
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
                },

            } }
            modules={ [Pagination, Navigation] }
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

        </Swiper>



    )
}

export default ProductSlider