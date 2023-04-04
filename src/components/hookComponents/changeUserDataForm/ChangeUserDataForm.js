import React, { useState } from "react";
import PropTypes from "prop-types";

// Component
import InputTextField from "../../functionalComponents/inputTextField/InputTextField";
import InputPasswordField from "../inputPasswordField/InputPasswordField";
import Button from "../../functionalComponents/button/Button";
// API
import {
  refreshToken,
  signOut,
  updateUser,
} from "../../../services/authServices";
// REDUX
import {
  removeUserCredentials,
  setUserCredentials,
} from "../../../redux/ducks/userDuck";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, setToken } from "../../../redux/ducks/tokenDuck";
// i18n
import { useTranslation } from "react-i18next";
// Utils
import {
  clearLocalStorage,
  setLocalStorage,
} from "../../../utils/localStorageUtils";
// Libraries
import { useForm } from "react-hook-form";
import moment from "moment";
// SCSS
import "./changeUserDataForm.scss";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import i18n from "../../../assets/translations/i18n";

function ChangeUserDataForm(props) {
  const [state, setState] = useState({
    invalidEmail: false,
    emailExist: false,
    invalidPassword: false,
    invalidAge: false,
    invalidConditions: false,
  });

  const { t } = useTranslation();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  const passwordReg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/;
  const token = useSelector((state) => state.tokenDuck.token);
  const refreshT = useSelector((state) => state.tokenDuck.refreshToken);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userDuck);
  const lang = i18n.language.slice(0, 2);

  console.log("USER INFO", userInfo);

  function handleForm() {
    props.toggleForm();
  }

  function notifyDataError() {
    toast.error("Dati non validi", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  }
  function notifyRefreshTokenError() {
    toast.warning("Devi effettuare di nuovo il login", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  }
  function notifyDataSuccess() {
    toast.success("Dati modificati", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
  }

  function notifyLogOutError() {
    toast.error("Errore nel Logout", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  }

  async function userLogOut() {
    const response = await signOut(refreshT, token);
    if (response.status < 300) {
      dispatch(removeUserCredentials());

      dispatch(removeToken());

      clearLocalStorage();

      notifyRefreshTokenError();

      setTimeout(() => {
        navigate(`${lang}`);
      }, 1500);
    } else {
      notifyLogOutError();
    }
  }

  const onSubmit = async (data) => {
    // inizializzo l'oggetto che va nella PUT API
    let newObj = {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      email: data.email,
      password: data.password,
    };

    let emailExist = false;

    let currentData = moment();
    let isInvalidAge = false;

    ////////////////////////////////////////////////////////////////////////

    // IMPLEMENTARE IL CHECK SULLA DATA
    if (
      !moment(data.birthDate, true).isValid() ||
      currentData.diff(data.birthDate, "years") < 16
    ) {
      isInvalidAge = true;
    }

    ////////////////////////////////////////////////////////////////////////

    // Check se l'input password è stato modificato, se non modificato non viene messo nella put

    if (!isInvalidAge) {
      if (
        data.password === null ||
        data.password === undefined ||
        data.password === ""
      ) {
        data.password = userInfo.password;
        newObj = {
          first_name: data.firstName,
          last_name: data.lastName,
          birth_date: data.birthDate,
          email: data.email,
        };
      }

      const response = await updateUser(newObj);

      if (response.status === 200) {
        dispatch(
          setUserCredentials({
            ...userInfo,
            name: data.firstName,
            surname: data.lastName,
            birthDate: data.birthDate,
            email: data.email,
            password: data.password,
            isLogged: true,
          })
        );
        console.log("RESPONSE PUT", response);
        notifyDataSuccess();
        handleForm();

        const refresh = await refreshToken();
        if (refresh.status < 300) {
          dispatch(
            setToken({
              token: refresh.data.token,
              refreshToken: refresh.data.refreshToken,
            })
          );

          setLocalStorage("token", refresh.data.token);
          setLocalStorage("refreshToken", refresh.data.refreshToken);
        } else {
          userLogOut();
        }
      }
    } else {
      notifyDataError();
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

  function onError(err) {
    console.log("error");
    notifyDataError();

    console.log(err?.password);

    setState({
      ...state,
      invalidEmail: err?.email ? true : false,
      invalidPassword: err?.password ? true : false,
      invalidFirstName: err?.firstName ? true : false,
      invalidLastName: err?.lastName ? true : false,
      invalidAge: err?.birthDate ? true : false,
    });
  }

  return (
    <div className="address__container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="login-form__input-container">
          <InputTextField
            inputName="email"
            defaultValueInput={userInfo.email}
            inputLabel={t("changeUserDataForm.email")}
            inputType="text"
            inputPlaceholder="Email"
            register={register}
            regexValidation={emailReg}
            labelStyle="default-label"
            inputStyle={`default-input margin-top-small`}
          />

          <InputTextField
            inputName="firstName"
            defaultValueInput={userInfo.name}
            inputLabel={t("changeUserDataForm.first_name")}
            inputType="text"
            inputPlaceholder="Nome"
            register={register}
            labelStyle="default-label"
            inputStyle={`default-input margin-top-small`}
          />

          <InputTextField
            inputName="lastName"
            defaultValueInput={userInfo.surname}
            inputLabel={t("changeUserDataForm.last_name")}
            inputType="text"
            inputPlaceholder="Cognome"
            register={register}
            labelStyle="default-label  "
            inputStyle={`default-input margin-top-small`}
          />

          <InputTextField
            inputName="birthDate"
            defaultValueInput={userInfo.birthDate}
            inputLabel={t("changeUserDataForm.birthDate")}
            inputType="date"
            inputPlaceholder="Data di nascita"
            register={register}
            isRequired={true}
            labelStyle="default-label margin-top-extra"
            inputStyle={`default-input margin-top-small ${state.invalidAge ? "default-input--error" : ""
              }`}
          />

          <InputPasswordField
            inputName="password"
            defaultValueInput={userInfo.password}
            inputLabel={t("changeUserDataForm.newPassword")}
            inputType="password"
            inputPlaceholder="Password"
            register={register}
            regexValidation={passwordReg}
            // isRequired={ true }
            labelStyle="default-label password-margin-top margin-top-extra"
            inputStyle={`default-input ${state.invalidPassword ? "default-input--error" : ""
              }`}
          />
        </div>

        <Button
          label={t("button.save")}
          buttonStyle="submit-button button-margin-top"
        />
      </form>
      <ToastContainer hideProgressBar />
    </div>
  );
}

ChangeUserDataForm.defaultProps = {};

ChangeUserDataForm.propTypes = {};

export default ChangeUserDataForm;
