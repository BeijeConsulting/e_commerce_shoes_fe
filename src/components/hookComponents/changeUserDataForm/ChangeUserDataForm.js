import React, { useState } from "react";
import PropTypes from "prop-types";

import "./changeUserDataForm.scss";

import InputTextField from "../../functionalComponents/inputTextField/InputTextField";
import InputPasswordField from "../inputPasswordField/InputPasswordField";
import Button from "../../functionalComponents/button/Button";

import { useForm } from "react-hook-form";

function ChangeUserDataForm() {
  const [state, setState] = useState({
    isInvalidActualPassword: false,
    isInvalidNewPassword: false,
  });
  const { register, handleSubmit } = useForm();
  const passwordReg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/;

  function onSubmit() {}

  function onError() {}

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="login-form__input-container">
        <InputTextField
          inputName="email"
          inputLabel="INDIRIZZO E-MAIL:"
          inputType="text"
          inputPlaceholder="Email"
          register={register}
          labelStyle="default-label  "
          inputStyle={`default-input margin-top-small`}
        />

        <InputPasswordField
          inputName="password"
          inputLabel="PASSWORD:"
          inputType="password"
          inputPlaceholder="Password"
          register={register}
          regexValidation={passwordReg}
          isRequired={true}
          labelStyle="default-label password-margin-top margin-top-extra"
          inputStyle={`default-input ${
            state.isInvalidActualPassword ? "default-input--error" : ""
          }`}
        />

        <InputPasswordField
          inputName="password"
          inputLabel="PASSWORD:"
          inputType="password"
          inputPlaceholder="Password"
          register={register}
          regexValidation={passwordReg}
          isRequired={true}
          labelStyle="default-label password-margin-top margin-top-extra"
          inputStyle={`default-input ${
            state.isInvalidNewPassword ? "default-input--error" : ""
          }`}
        />
      </div>
      <Button
        label="Salva Credenziali"
        buttonStyle="submit-button button-margin-top"
      />
    </form>
  );
}

ChangeUserDataForm.defaultProps = {};

ChangeUserDataForm.propTypes = {};

export default ChangeUserDataForm;
