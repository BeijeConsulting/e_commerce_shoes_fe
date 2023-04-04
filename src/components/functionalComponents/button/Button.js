import React from "react";
import "./button.scss";
import PropTypes from "prop-types";

function Button(props) {
  function handleClick(e) {
    if (!props.handleClick) return;

    props.handleClick(e);
  }

  return (
    <button onClick={handleClick} className={props.buttonStyle}>
      {props.label}
      {props.children}
    </button>
  );
}

Button.defaultProps = {
  label: "Button",
};

Button.propTypes = {
  buttonStyle: PropTypes.string,
  handleClick: PropTypes.func,
  label: PropTypes.string,
};

export default Button;
