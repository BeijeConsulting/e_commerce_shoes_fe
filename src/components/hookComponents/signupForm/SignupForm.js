import React, { useState } from "react";
import "./signupForm.scss";
import InputTextField from "../../functionalComponents/inputTextField/InputTextField";
import Button from "../../functionalComponents/button/Button";
import { useForm } from "react-hook-form";
import moment from "moment/moment";
import InputCheckbox from "../../functionalComponents/inputCheckbox/InputCheckbox";
import InputPasswordField from "../inputPasswordField/InputPasswordField";
import { signUp } from "../../../services/authServices";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../../utils/localStorageUtils";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../../redux/ducks/userDuck";
import { useNavigate } from "react-router-dom";
import Seo from "../../functionalComponents/Seo";
import { setToken } from "../../../redux/ducks/tokenDuck";
import {
  addListItemToCartList,
  getCartList,
} from "../../../services/cartServices";
import i18n from "../../../assets/translations/i18n";

function SignupForm() {
  const [state, setState] = useState({
    invalidEmail: false,
    emailExist: false,
    invalidPassword: false,
    invalidAge: false,
    invalidConditions: false,
  });

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = i18n.language.slice(0, 2);

  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  const passwordReg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/;

  const onSubmit = async (data) => {
    let emailExist = false;
    let response = null;
    let error = null;
    const { birthDate } = data;

    let currentData = moment();
    let isInvalidAge = false;

    if (
      !moment(birthDate, true).isValid() ||
      currentData.diff(birthDate, "years") < 16
    ) {
      isInvalidAge = true;
    }

    console.log(data);

    if (!isInvalidAge) {
      try {
        response = await signUp({
          birth_date: data.birthDate,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          password: data.password,
          surname: data.lastName,
        });
      } catch (err) {
        error = err.response.data;
      }

      if (response && response.status === 200) {
        setLocalStorage("token", response.data.token);
        setLocalStorage("refreshToken", response.data.refreshToken);

        console.log(response);

        dispatch(
          setToken({
            token: response.data.token,
            refreshToken: response.data.refreshToken,
          })
        );

        dispatch(
          setUserCredentials({
            name: response.data.user.name,
            birthDate,
            email: response.data.user.email,
            surname: response.data.user.surname,
            isLogged: true,
          })
        );

        const localCart = getLocalStorage("cart-list");

        if (localCart?.items?.length > 0) {
          const items = localCart.items.map((item) => {
            return {
              id: item.id,
              productDetailsId: item.productDetailsId,
              quantity: item.quantity,
            };
          });

          console.log(items);
          const listResp = await addListItemToCartList(items);
          console.log(listResp);
        }

        const userCart = await getCartList();
        console.log(userCart.data);
        if (userCart.status === 200) {
          setLocalStorage("cart-list", userCart.data);
          console.log(getLocalStorage("cart-list"));
        }

        return navigate(`/${lang}`);
      }

      if (error.message.toLowerCase() === "email already in use!") {
        emailExist = true;
      }
    }

    setState({
      ...state,
      emailExist,
      invalidEmail: false,
      invalidPassword: false,
      invalidFirstName: false,
      invalidLastName: false,
      invalidAge: isInvalidAge,
    });
  };

  const onError = (err) => {
    setState({
      ...state,
      invalidEmail: err?.email ? true : false,
      invalidPassword: err?.password ? true : false,
      invalidFirstName: err?.firstName ? true : false,
      invalidLastName: err?.lastName ? true : false,
      invalidAge: err?.birthDate ? true : false,
    });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
      <Seo
        title="Registrazione"
        description="Registrazione"
        content="e-commerce"
      />
      <div className="login-form__input-container">
        <InputTextField
          inputName="firstName"
          inputLabel="NOME:"
          inputType="text"
          inputPlaceholder="Nome"
          register={register}
          isRequired={true}
          labelStyle="default-label margin-top"
          inputStyle={`default-input margin-top-small ${state.invalidFirstName ? "default-input--error" : ""
            }`}
        />
        <InputTextField
          inputName="lastName"
          inputLabel="COGNOME:"
          inputType="text"
          inputPlaceholder="Cognome"
          register={register}
          isRequired={true}
          labelStyle="default-label margin-top-extra"
          inputStyle={`default-input margin-top-small ${state.invalidLastName ? "default-input--error" : ""
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
          labelStyle="default-label margin-top-extra"
          inputStyle={`default-input margin-top-small ${state.invalidEmail ? "default-input--error" : ""
            }`}
        />

        {state.invalidEmail && (
          <span className="error-message">L'indirizzo email non è valido</span>
        )}

        {state.emailExist && (
          <span className="error-message">
            Esiste già un account con questa email
          </span>
        )}

        <InputPasswordField
          inputName="password"
          inputLabel="PASSWORD:"
          inputType="password"
          inputPlaceholder="Password"
          register={register}
          regexValidation={passwordReg}
          isRequired={true}
          labelStyle="default-label margin-top-extra"
          inputStyle={`default-input  ${state.invalidPassword ? "default-input--error" : ""
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
          labelStyle="default-label margin-top-extra"
          inputStyle={`default-input margin-top-small ${state.invalidAge ? "default-input--error" : ""
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
          inputClasses={"margin-top-extra"}
          isRequired={true}
        />
      </div>
      <Button label="Sign Up" buttonStyle="submit-button button-margin-top" />
    </form>
  );
}

export default SignupForm;
