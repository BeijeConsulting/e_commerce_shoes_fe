import React, { useState } from "react";
import "./inputPasswordField.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityOnIcon from "@mui/icons-material/Visibility";

function InputPasswordField(props) {
  const [state, setState] = useState({
    showPassword: false,
  });
  const register = props?.register;

  function handleChange(e) {
    if (!props?.onChangeSendData) return;

    props.onChangeSendData(e);
  }

  function toggleVisibility() {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  }
  return (
    <>
      {props.inputLabel && (
        <label className={props.labelStyle} htmlFor={props.inputName}>
          {props.inputLabel}
        </label>
      )}

      <div className="password-wrapper margin-top-small">
        {register && (
          <input
            type={state.showPassword ? "text" : "password"}
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
            type={state.showPassword ? "text" : "password"}
            placeholder={props.inputPlaceholder}
            name={props.inputName}
            className={props.inputStyle}
            onChange={handleChange}
          />
        )}

        <div className="icon-container" onClick={toggleVisibility}>
          {!state.showPassword && <VisibilityOnIcon fontSize="large" />}
          {state.showPassword && <VisibilityOffIcon fontSize="large" />}
        </div>
      </div>
    </>
  );
}

InputPasswordField.default = {
  isRequired: false,
};

export default InputPasswordField;
