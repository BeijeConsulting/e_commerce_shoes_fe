import React, { useState } from "react";
import "./signupForm.scss";
import InputTextField from "../../functionalComponents/inputTextField/InputTextField";
import Button from "../../functionalComponents/button/Button";
import { useForm } from "react-hook-form";

function SignupForm() {
  const [state, setState] = useState({
    invalidEmail: false,
    invalidPassword: false,
    invalidAge: false,
    invalidConditions: false,
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
      invalidFirstName: false,
      invalidLastName: false,
      invalidAge: false,
    });
  };
  const onError = (err) => {
    console.log("Fail");
    console.log(err);

    setState({
      ...state,
      invalidEmail: err?.email ? true : false,
      invalidPassword: err?.password ? true : false,
      invalidFirstName: err?.firstName ? true : false,
      invalidLastName: err?.lastName ? true : false,
      invalidAge: err?.birthDate ? true : false,
    });
  };
  // console.log(errors);

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
      "
      <div className="login-form__input-container">
        <InputTextField
          name="firstName"
          inputLabel="NOME:"
          inputType="text"
          inputPlaceholder="Nome"
          register={register}
          isRequired={true}
          labelStyle="default-label margin-top"
          inputStyle={`default-input ${
            state.invalidFirstName ? "default-input--error" : ""
          }`}
        />
        <InputTextField
          name="lastName"
          inputLabel="COGNOME:"
          inputType="text"
          inputPlaceholder="Cognome"
          register={register}
          isRequired={true}
          labelStyle="default-label margin-top"
          inputStyle={`default-input ${
            state.invalidLastName ? "default-input--error" : ""
          }`}
        />
        <InputTextField
          name="email"
          inputLabel="INDIRIZZO E-MAIL:"
          inputType="text"
          inputPlaceholder="Email"
          register={register}
          regexValidation={emailReg}
          isRequired={true}
          labelStyle="default-label margin-top"
          inputStyle={`default-input ${
            state.invalidEmail ? "default-input--error" : ""
          }`}
        />

        <InputTextField
          name="password"
          inputLabel="PASSWORD:"
          inputType="password"
          inputPlaceholder="Password"
          register={register}
          regexValidation={passwordReg}
          isRequired={true}
          labelStyle="default-label margin-top"
          inputStyle={`default-input ${
            state.invalidPassword ? "default-input--error" : ""
          }`}
        />

        <InputTextField
          name="birthDate"
          inputLabel="DATA DI NASCITA:"
          inputType="date"
          inputPlaceholder="Data di nascita"
          register={register}
          isRequired={true}
          labelStyle="default-label margin-top"
          inputStyle={`default-input ${
            state.invalidAge ? "default-input--error" : ""
          }`}
        />
      </div>
      <div>
        <input type={"checkbox"} />
        <label>Accept Terms</label>
      </div>
      <Button label="Sign Up" buttonStyle="submit-button button-margin-top" />
    </form>
  );
}

export default SignupForm;
