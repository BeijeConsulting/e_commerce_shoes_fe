import React, { useState } from "react";
import "./loginForm.scss";
import { useForm } from "react-hook-form";
import Button from "../../functionalComponents/button/Button";
import InputTextField from "../../functionalComponents/inputTextField/InputTextField";
import InputPasswordField from "../inputPasswordField/InputPasswordField";
import { signin, getUser } from "../../../services/authServices";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../../redux/ducks/userDuck";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../../utils/localStorageUtils";
import i18n from "../../../assets/translations/i18n";
import Seo from "../../functionalComponents/Seo";
import { setToken } from "../../../redux/ducks/tokenDuck";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lang = i18n.language.slice(0, 2);

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

    console.log(response)

    if (response.status === 200) {
      const user = await getUser(response.data.token);

      console.log("USER", user)


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

      navigate(`/${lang}`);
    }

    console.log(response);

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
      <Seo title="LogIn" description="LogIn" content="e-commerce" />
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
          inputStyle={`default-input margin-top-small ${state.invalidEmail ? "default-input--error" : ""
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
          inputStyle={`default-input ${state.invalidPassword ? "default-input--error" : ""
            }`}
        />
      </div>
      <Button label="Login" buttonStyle="submit-button button-margin-top" />
    </form>
  );
}

export default LoginForm;
