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
// Components
import Button from "../../functionalComponents/button/Button";
import InputTextField from "../../functionalComponents/inputTextField/InputTextField";
import InputPasswordField from "../inputPasswordField/InputPasswordField";

import {
  getLocalStorage,
  setLocalStorage,
} from "../../../utils/localStorageUtils";
import i18n from "../../../assets/translations/i18n";
import Seo from "../../functionalComponents/Seo";
import {
  addItemToCartList,
  addListItemToCartList,
  getCartList,
} from "../../../services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

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

  function notifyLoginSuccess() {
    toast.success("Login", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
  }
  function notifyLoginError() {
    toast.error("Dati non validi", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  }

  function notifyLoginCredentialsError() {
    toast.error("Credenziali errate", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  }

  const onSubmit = async (data) => {
    try {
      const response = await signin({
        email: data.email,
        password: data.password,
      });

      console.log(response);
      console.log("try error");

      if (response.status === 200) {
        const user = await getUser(response.data.token);

        console.log("USER", user);

        dispatch(
          setUserCredentials({
            name: user.data.first_name,
            surname: user.data.last_name,
            email: user.data.email,
            adresses: [...user.data.addresses],
            birthDate: user.data.birth_date,
            cartItems: user.data.cart_items,
            wishListItems: user.data.wish_list_item,
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

        const localCart = getLocalStorage("cart-list");

        const cartFetch = await getCartList();
        console.log(cartFetch);

        if (localCart?.items?.length > 0) {
          const items = localCart.items.map((item) => {
            return {
              id: item.productId,
              productDetailsId: item.productDetailsId,
              quantity: item.quantity,
              // userId: response.data.id,
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

        dispatch(
          setUserCredentials({
            name: user.data.first_name,
            surname: user.data.last_name,
            email: user.data.email,
            adresses: [...user.data.addresses],
            birthDate: user.data.birth_date,
            // cartItems: user.data.cart_items,
            wishListItems: user.data.wish_list_item,
            isLogged: true,
          })
        );

        notifyLoginSuccess();
        setTimeout(() => {
          navigate(`/${lang}`);
        }, 1500);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
      notifyLoginCredentialsError();
    }

    setState({
      ...state,
      invalidEmail: false,
      invalidPassword: false,
    });
  };

  const onError = (err) => {
    notifyLoginError();
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
      <ToastContainer hideProgressBar />
    </form>
  );
}

export default LoginForm;
