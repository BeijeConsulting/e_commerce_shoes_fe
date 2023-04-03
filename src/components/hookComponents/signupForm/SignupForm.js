import React, { useState } from "react";

// REDUX
import { setToken } from "../../../redux/ducks/tokenDuck";
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
// API
// Utils
// Router
import { useNavigate } from "react-router-dom";
// Components
import Seo from "../../functionalComponents/Seo";
// Libraries
// i18n
import { useTranslation } from 'react-i18next';
// SCSS
import "./signupForm.scss";
import {
  addListItemToCartList,
  getCartList,
} from "../../../services/cartServices";
import i18n from "../../../assets/translations/i18n";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupForm() {
  const [state, setState] = useState({
    invalidEmail: false,
    emailExist: false,
    invalidPassword: false,
    invalidAge: false,
    invalidConditions: false,
  });

  const { t } = useTranslation()

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = i18n.language.slice(0, 2);

  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  const passwordReg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/;

  function notifySignupSuccess() {
    toast.success("Registrato con successo", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
  }
  function notifySignupError() {
    toast.error("Dati non validi", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  }
  function notifySignupEmailError() {
    toast.error("Hai inserito una email esistente", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  }

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
              id: item.productId,
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

        notifySignupSuccess();
        setTimeout(() => {
          return navigate(`/${lang}`);
        }, 1500);
      }

      if (error.message.toLowerCase() === "email already in use!") {
        emailExist = true;
        notifySignupEmailError();
      }
    } else {
      notifySignupError();
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
    notifySignupError();
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
    <form className="login-form" onSubmit={ handleSubmit(onSubmit, onError) }>
      <Seo
        title="Registrazione"
        description="Registrazione"
        content="e-commerce"
      />
      <div className="login-form__input-container">
        <InputTextField
          inputName="firstName"
          inputLabel={ t("addresses.firstName") + ":" }
          inputType="text"
          inputPlaceholder="Nome"
          register={ register }
          isRequired={ true }
          labelStyle="default-label margin-top"
          inputStyle={ `default-input margin-top-small ${state.invalidFirstName ? "default-input--error" : ""
            }` }
        />
        <InputTextField
          inputName="lastName"
          inputLabel={ t("addresses.lastName") + ":" }
          inputType="text"
          inputPlaceholder="Cognome"
          register={ register }
          isRequired={ true }
          labelStyle="default-label margin-top-extra"
          inputStyle={ `default-input margin-top-small ${state.invalidLastName ? "default-input--error" : ""
            }` }
        />
        <InputTextField
          inputName="email"
          inputLabel={ t("addresses.email") + ":" }
          inputType="text"
          inputPlaceholder="Email"
          register={ register }
          regexValidation={ emailReg }
          isRequired={ true }
          labelStyle="default-label margin-top-extra"
          inputStyle={ `default-input margin-top-small ${state.invalidEmail ? "default-input--error" : ""
            }` }
        />

        { state.invalidEmail && (
          <span className="error-message">{ t("emailRule.notValid") }</span>
        ) }

        { state.emailExist && (
          <span className="error-message">
            { t("emailRule.already") }
          </span>
        ) }

        <InputPasswordField
          inputName="password"
          inputLabel="PASSWORD:"
          inputType="password"
          inputPlaceholder="Password"
          register={ register }
          regexValidation={ passwordReg }
          isRequired={ true }
          labelStyle="default-label margin-top-extra"
          inputStyle={ `default-input  ${state.invalidPassword ? "default-input--error" : ""
            }` }
        />

        { state.invalidPassword && (
          <span className="error-message">
            { t("passwordRules.rule") }:
            <ul>
              <li>{ t("passwordRules.eight") }</li>
              <li>{ t("passwordRules.lowercase") }</li>
              <li>{ t("passwordRules.uppercase") }</li>
              <li>{ t("passwordRules.number") }</li>
              <li>{ t("passwordRules.special") }</li>
            </ul>
          </span>
        ) }

        <InputTextField
          inputName="birthDate"
          inputLabel={ t("addresses.birthDate") + ":" }
          inputType="date"
          inputPlaceholder="Data di nascita"
          register={ register }
          isRequired={ true }
          labelStyle="default-label margin-top-extra"
          inputStyle={ `default-input margin-top-small ${state.invalidAge ? "default-input--error" : ""
            }` }
        />

        { state.invalidAge && (
          <span className="error-message">
            Data non valida: devi avere almeno 16 anni
          </span>
        ) }

        <InputCheckbox
          inputId={ "acceptTerms" }
          label={ t("terms") }
          inputClasses={ "margin-top-extra" }
          isRequired={ true }
        />
      </div>
      <Button label="Sign Up" buttonStyle="submit-button button-margin-top" />
      <ToastContainer hideProgressBar />
    </form>
  );
}

export default SignupForm;
