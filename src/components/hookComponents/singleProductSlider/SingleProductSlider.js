import React, { useState } from "react";

// import shoe1 from "../../../assets/images/singleProduct/shoe1.jpeg"
// import shoe2 from "../../../assets/images/singleProduct/shoe2.jpeg"
// import shoe3 from "../../../assets/images/singleProduct/shoe3.jpeg"

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// SCSS
import "./singleProductSlider.scss";

function SingleProductSlider(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  function mapImages(item, key) {
    return <SwiperSlide key={`${key}-${Math.random()}`}>
      <img
        src={item.image_path}
        alt={item.alt}
      />
    </SwiperSlide>
  }

  return (
    <div className="swiper__container">
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {props.images.map(mapImages)}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={props.images.length}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {props.images.map(mapImages)}
      </Swiper>
    </div>
  );
}

export default SingleProductSlider;
