import React from "react";
import "./inputTextField.scss";

function InputTextField(props) {
  const register = props?.register;

  function handleChange(e) {
    if (!props?.onChangeSendData) return;

    props.onChangeSendData(e);
  }
  return (
    <>
      {props.inputLabel && (
        <label className={props.labelStyle} htmlFor={props.name}>
          {props.inputLabel}
        </label>
      )}

      {register && (
        <input
          type={props.inputType}
          placeholder={props.inputPlaceholder}
          name={props.name}
          className={props.inputStyle}
          {...register(props.name, {
            required: props.isRequired,
            pattern: props.regexValidation ? props.regexValidation : /.*/,
          })}
        />
      )}

      {!register && (
        <input
          type={props.inputType}
          placeholder={props.inputPlaceholder}
          name={props.name}
          className={props.inputStyle}
          onChange={handleChange}
        />
      )}
    </>
  );
}

InputTextField.default = {
  isRequired: false,
};

export default InputTextField;
