import React from "react";
import "./button.scss";

function Button(props) {
  console.log(props.buttonStyle);
  function handleClick(e) {
    if (!props.handleClick) return;

    props.handleClick(e);
  }

  return (
    <button onClick={handleClick} className={props.buttonStyle}>
      {props.label}
    </button>
  );
}

export default Button;
