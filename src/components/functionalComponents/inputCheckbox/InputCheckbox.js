import React from "react";
import "./inputCheckbox.scss";

function InputCheckbox(props) {
  function handleOnChange(e) {
    if (props.inputOnChange && typeof props.inputOnChange === "function") {
      props.inputOnChange(e);
    }
  }

  return (
    <div className={`input-checkbox ${props.inputClasses}`}>
      <input
        onChange={handleOnChange}
        type={"checkbox"}
        name={props.inputName}
        id={props.inputId}
        required={props.isRequired}
      />

      <label htmlFor={props.inputId}>{props.label}</label>
    </div>
  );
}

InputCheckbox.defaultProps = {
  isRequired: false,
};

export default InputCheckbox;

export default InputCheckbox;