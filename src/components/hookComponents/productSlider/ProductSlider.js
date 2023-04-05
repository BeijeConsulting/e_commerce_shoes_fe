import React, { useRef } from "react";
// import PropTypes from "prop-types";

// imgaes
import productCardImg from "../../../assets/images/productCardImg.jpg";
// Icons
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
// Components
import ProductCard from "../../functionalComponents/ProductCard/ProductCard";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// SCSS
import "./productSlider.scss";

function ProductSlider(props) {
  const swiperNavNextRef = useRef(null);
  const swiperNavPrevRef = useRef(null);

  function mapProducts(item, key) {
    return (
      <SwiperSlide
        key={`${key}-${Math.random()}`}
        className="productSlider__slide"
      >
        <ProductCard
          image={require("../../../assets/images/productCardImg.jpg")}
          brand={item.brand}
          name={item.name}
          category={item.category}
          price={item.starting_price}
          idProduct={item.id}
        />
      </SwiperSlide>
    );
  }

  return (
    <div className="container__slide">
      <div className="container__slide--h2">
        <h2>{props.sliderTitle}</h2>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: swiperNavNextRef.current,
          prevEl: swiperNavPrevRef.current,
        }}
        breakpoints={{
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
        }}
        modules={[Pagination, Navigation]}
        onInit={(swiper) => {
          swiper.params.navigation.nextEl = swiperNavNextRef.current;
          swiper.params.navigation.prevEl = swiperNavPrevRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="slider"
      >
        {props.products.map(mapProducts)}

        <div className="swiperNavNext" ref={swiperNavPrevRef}>
          <BsFillArrowLeftCircleFill />
        </div>
        <div className="swiperNavPrev" ref={swiperNavNextRef}>
          <BsFillArrowRightCircleFill />
        </div>
      </Swiper>
    </div>
  );
}

export default ProductSlider;
