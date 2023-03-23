import React, { useState } from "react";
import "./loginForm.scss";
import { useForm } from "react-hook-form";
import Button from "../../functionalComponents/button/Button";
import InputTextField from "../../functionalComponents/inputTextField/InputTextField";
import InputPasswordField from "../inputPasswordField/InputPasswordField";
import { signin, getUser } from "../../../services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { setUserCredentials } from "../../../redux/ducks/userDuck";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    invalidEmail: false,
    invalidPassword: false,
  });
  const { register, handleSubmit } = useForm();

  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  const passwordReg = /^.{2,}$/;

  const onSubmit = async (data) => {
    console.log("Success");
    console.log(data);

    const response = await signin({
      email: data.email,
      password: data.password,
    });

    if (response.status === 200) {
      const user = await getUser(response.data.token);

      dispatch(
        setUserCredentials({
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          name: user.data.name,
          surname: user.data.surname,
          cartItems: user.data.cartItems,
          wishlistItems: user.data.wishlistItems,
        })
      );

      navigate("/");
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
