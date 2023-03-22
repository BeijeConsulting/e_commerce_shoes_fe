import React, { useState } from "react";
import "./loginForm.scss";
import { useForm } from "react-hook-form";
import Button from "../../functionalComponents/button/Button";
import InputTextField from "../../functionalComponents/inputTextField/InputTextField";
import InputPasswordField from "../inputPasswordField/InputPasswordField";

function LoginForm() {
  const [state, setState] = useState({
    invalidEmail: false,
    invalidPassword: false,
  });
  const { register, handleSubmit } = useForm();

  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  const passwordReg = /^.{8,}$/;

  const onSubmit = (data) => {
    console.log("Success");
    console.log(data);

    setState({
      ...state,
      invalidEmail: false,
      invalidPassword: false,
    });
  };
  const onError = (err) => {
    console.log("Fail");
    console.log(err);

    setState({
      ...state,
      invalidEmail: err?.email ? true : false,
      invalidPassword: err?.password ? true : false,
    });
  };
  // console.log(errors);

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="login-form__input-container">
        <InputTextField
          inputName="email"
          inputLabel="INDIRIZZO E-MAIL:"
          inputType="text"
          inputPlaceholder="Email"
          register={register}
          regexValidation={emailReg}
          isRequired={true}
          labelStyle="default-label  "
          inputStyle={`default-input margin-top-small ${
            state.invalidEmail ? "default-input--error" : ""
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
            state.invalidPassword ? "default-input--error" : ""
          }`}
        />
      </div>
      <Button label="Login" buttonStyle="submit-button button-margin-top" />
    </form>
  );
}

export default LoginForm;
