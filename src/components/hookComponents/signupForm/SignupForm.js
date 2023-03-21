import React, { useState } from "react";
import "./signupForm.scss";
import InputTextField from "../../functionalComponents/inputTextField/InputTextField";
import Button from "../../functionalComponents/button/Button";
import { useForm } from "react-hook-form";
import moment from "moment/moment";
import InputCheckbox from "../../functionalComponents/inputCheckbox/InputCheckbox";

function SignupForm() {
  const [state, setState] = useState({
    invalidEmail: false,
    invalidPassword: false,
    invalidAge: false,
    invalidConditions: false,
  });

  const { register, handleSubmit } = useForm();

  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  const passwordReg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/;
  const onSubmit = (data) => {
    console.log("Success");
    console.log(data);

    let currentData = moment();
    let userBirthDate = data.birthDate;
    let isInvalidAge = false;

    if (
      !moment(userBirthDate, true).isValid() ||
      currentData.diff(userBirthDate, "years") < 16
    ) {
      isInvalidAge = true;
    }

    setState({
      ...state,
      invalidEmail: false,
      invalidPassword: false,
      invalidFirstName: false,
      invalidLastName: false,
      invalidAge: isInvalidAge,
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
          inputName="firstName"
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
          inputName="lastName"
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
          inputName="email"
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

        {state.invalidEmail && (
          <span className="error-message">L'indirizzo email non è valido</span>
        )}

        <InputTextField
          inputName="password"
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

        {state.invalidPassword && (
          <span className="error-message">
            La password deve contenere:
            <ul>
              <li>Almeno 8 caratteri</li>
              <li>Almeno un carattere minuscolo</li>
              <li>Almeno un carattere maiuscolo</li>
              <li>Almeno un numero</li>
              <li>Almeno un carattere speciale</li>
            </ul>
          </span>
        )}

        <InputTextField
          inputName="birthDate"
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

        {state.invalidAge && (
          <span className="error-message">
            Data non valida: devi avere almeno 16 anni
          </span>
        )}

        <InputCheckbox
          inputId={"acceptTerms"}
          label={"Accetta i termini"}
          inputClasses={"margin-top"}
          isRequired={true}
        />
      </div>
      <Button label="Sign Up" buttonStyle="submit-button button-margin-top" />
    </form>
  );
}

export default SignupForm;
