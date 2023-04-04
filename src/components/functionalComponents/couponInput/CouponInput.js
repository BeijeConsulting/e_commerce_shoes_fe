import React, { useRef } from "react";

// MUI
import EastIcon from "@mui/icons-material/East";
// i18n
import { useTranslation } from 'react-i18next';
// SCSS
import "./couponInput.scss";

function CouponInput(props) {
  const { t } = useTranslation()
  const ref = useRef(null);

  function handleOnKeyPress(e) {
    if (e.key.toLowerCase() !== "enter") return;
    const input = ref.current.value.toLowerCase();
    if (input === "") return;
    if (props.handleCoupon && typeof props.handleCoupon === "function") {
      props.handleCoupon(input);
    }
    ref.current.value = "";
  }

  function handleOnClick() {
    const input = ref.current.value.toLowerCase();
    if (props.handleCoupon && typeof props.handleCoupon === "function") {
      props.handleCoupon(input);
    }
    // ref.current.value = "";
  }

  return (
    <div className="coupon-input">
      <label htmlFor="coupon-input">{ t("coupon") }</label>
      <div className="__input-container">
        <input
          ref={ ref }
          type={ "text" }
          name={ props.inputName }
          onKeyUp={ handleOnKeyPress }
          id={ "coupon-input" }
        />
        <button onClick={ handleOnClick }>
          <EastIcon />
        </button>
      </div>
    </div>
  );
}

export default CouponInput;
