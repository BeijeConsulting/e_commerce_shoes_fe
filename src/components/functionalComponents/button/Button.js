import React from "react";
import PropTypes from 'prop-types';

// SCSS
import "./button.scss";

function Button(props) {
  function handleClick(e) {
    if (!props.handleClick) return;

    props.handleClick(e);
  }

  return (
    <button onClick={ handleClick }
      className={ props.buttonStyle }>
      { props.label }
      { props.children }
    </button>
  );
}

Button.defaultProps = {
  buttonStyle: "default-button",
  label: "label",
}

Button.propTypes = {
  buttonStyle: PropTypes.string,
  handleClick: PropTypes.func,
}

export default Button;
