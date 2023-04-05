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

  return (
    <div className="swiper__container">
      <Swiper
        // style={ {
        //     "--swiper-navigation-color": "#fff",
        //     "--swiper-pagination-color": "#fff",
        // } }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={require("../../../assets/images/singleProduct/shoe1.jpeg")}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={require("../../../assets/images/singleProduct/shoe2.jpeg")}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={require("../../../assets/images/singleProduct/shoe3.jpeg")}
            alt=""
          />
        </SwiperSlide>
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img
            src={require("../../../assets/images/singleProduct/shoe1.jpeg")}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={require("../../../assets/images/singleProduct/shoe2.jpeg")}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={require("../../../assets/images/singleProduct/shoe3.jpeg")}
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SingleProductSlider;
