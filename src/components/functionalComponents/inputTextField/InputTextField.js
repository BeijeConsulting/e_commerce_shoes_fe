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
        <label className={props.labelStyle} htmlFor={props.inputName}>
          {props.inputLabel}
        </label>
      )}

      {register && (
        <input
          type={props.inputType}
          placeholder={props.inputPlaceholder}
          name={props.inputName}
          className={props.inputStyle}
          {...register(props.inputName, {
            required: props.isRequired,
            pattern: props.regexValidation ? props.regexValidation : /.*/,
          })}
        />
      )}

      {!register && (
        <input
          type={props.inputType}
          placeholder={props.inputPlaceholder}
          name={props.inputName}
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
