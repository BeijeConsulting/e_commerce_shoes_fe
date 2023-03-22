import React from "react";
import "./button.scss";

function Button(props) {
  function handleClick(e) {
    if (!props.handleClick) return;

    props.handleClick(e);
  }

  return (
<<<<<<< HEAD
    <button onClick={handleClick}
      className={props.buttonStyle}>
      {props.label}
      {props.children}
=======
    <button onClick={handleClick} className={props.buttonStyle}>
      {props.label}
>>>>>>> develop
    </button>
  );
}

export default Button;
