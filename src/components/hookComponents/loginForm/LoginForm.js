import React, { useState } from "react";

// API
import { signin, getUser } from "../../../services/authServices";
// Redux
import { setUserCredentials } from "../../../redux/ducks/userDuck";
import { setToken } from "../../../redux/ducks/tokenDuck";
import { useDispatch } from "react-redux";
// Router
import { useNavigate } from "react-router-dom";
// Utils
import { setLocalStorage } from "../../../utils/localStorageUtils";
// Components
import Button from "../../functionalComponents/button/Button";
import InputTextField from "../../functionalComponents/inputTextField/InputTextField";
import InputPasswordField from "../inputPasswordField/InputPasswordField";
import Seo from "../../functionalComponents/Seo";
// i18n
import { useTranslation } from 'react-i18next';
import i18n from "../../../assets/translations/i18n";
// Libraries
import { useForm } from "react-hook-form";
// SCSS
import "./loginForm.scss";



function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lang = i18n.language.slice(0, 2);
  const { t } = useTranslation()

  const [state, setState] = useState({
    invalidEmail: false,
    invalidPassword: false,
  });

  const { register, handleSubmit } = useForm();

  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  const passwordReg = /^.{2,}$/;

  const onSubmit = async (data) => {
    const response = await signin({
      email: data.email,
      password: data.password,
    });

    console.log("onSubmite", response)

    if (response.status === 200) {
      const user = await getUser(response.data.token);

      console.log("USER", user.data.wish_list_item)


      dispatch(
        setUserCredentials({
          name: user.data.first_name,
          surname: user.data.last_name,
          email: user.data.email,
          adresses: [...user.data.addresses],
          birthDate: user.data.birth_date,
          cartItems: user.data.cart_items,
          wishlistItems: user.data.wish_list_item,
          isLogged: true,
        })
      );

      dispatch(
        setToken({
          token: response.data.token,
          refreshToken: response.data.refreshToken,
        })
      );

      setLocalStorage("token", response.data.token);
      setLocalStorage("refreshToken", response.data.refreshToken);

      navigate(`/${lang}`);
    }


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
    <form className="login-form" onSubmit={ handleSubmit(onSubmit, onError) }>
      <Seo title="LogIn" description="LogIn" content="e-commerce" />
      <div className="login-form__input-container">
        <InputTextField
          inputName="email"
          inputLabel={ t("login.email") + ":" }
          inputType="text"
          inputPlaceholder="Email"
          register={ register }
          regexValidation={ emailReg }
          isRequired={ true }
          labelStyle="default-label  "
          inputStyle={ `default-input margin-top-small ${state.invalidEmail ? "default-input--error" : ""
            }` }
        />

        <InputPasswordField
          inputName="password"
          inputLabel={ t("login.password") + ":" }
          inputType="password"
          inputPlaceholder="Password"
          register={ register }
          regexValidation={ passwordReg }
          isRequired={ true }
          labelStyle="default-label password-margin-top margin-top-extra"
          inputStyle={ `default-input ${state.invalidPassword ? "default-input--error" : ""
            }` }
        />
      </div>
      <Button label="Login" buttonStyle="submit-button button-margin-top" />
    </form>
  );
}

export default LoginForm;
