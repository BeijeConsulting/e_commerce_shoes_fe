import React, { useRef } from "react";
import "./couponInput.scss";

import EastIcon from "@mui/icons-material/East";

function CouponInput(props) {
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
    if (input === "") return;
    if (props.handleCoupon && typeof props.handleCoupon === "function") {
      props.handleCoupon(input);
    }
    ref.current.value = "";
  }

  return (
    <div className="coupon-input">
      <label htmlFor="coupon-input">COUPON E CODICE SCONTO</label>
      <div className="__input-container">
        <input
          ref={ref}
          type={"text"}
          name={props.inputName}
          onKeyUp={handleOnKeyPress}
          id={"coupon-input"}
        />
        <button onClick={handleOnClick}>
          <EastIcon />
        </button>
      </div>
    </div>
  );
}

export default CouponInput;
