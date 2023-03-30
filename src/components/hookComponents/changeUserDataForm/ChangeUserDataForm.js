import React, { useState } from "react";
import PropTypes from "prop-types";

// Component
import InputTextField from "../../functionalComponents/inputTextField/InputTextField";
import InputPasswordField from "../inputPasswordField/InputPasswordField";
import Button from "../../functionalComponents/button/Button";
// API
import { refreshToken, updateUser } from '../../../services/authServices';
// REDUX
import { setUserCredentials } from '../../../redux/ducks/userDuck';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../../redux/ducks/tokenDuck';
// Utils
import { setLocalStorage } from '../../../utils/localStorageUtils';
// Libraries
import { useForm } from "react-hook-form";
import moment from 'moment';
// SCSS
import "./changeUserDataForm.scss";

function ChangeUserDataForm(props) {

  const [state, setState] = useState({
    invalidEmail: false,
    emailExist: false,
    invalidPassword: false,
    invalidAge: false,
    invalidConditions: false,
  });
  const { register, handleSubmit } = useForm();
  const passwordReg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/;

  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userDuck)

  // Dati inseriti nel defaultValueInput della date
  // const unserInfoDay = userInfo.birthDate.dayOfMonth?.toString()
  //   ?.padStart(2, "0")
  // const unserInfoMonth = userInfo.birthDate.monthValue?.toString()
  //   ?.padStart(2, "0")
  // const unserInfoYear = userInfo.birthDate.year


  const onSubmit = async (data) => {

    // inizializzo l'oggetto che va nella PUT API
    let newObj = {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      email: data.email,
      password: data.password
    }

    // slice della data per averla nel formato giusto
    const day = data.birthDate.slice(8, 11)
    const month = data.birthDate.slice(5, 7)
    const year = data.birthDate.slice(0, 4)


    let emailExist = false;
    let response = null;
    let error = null;


    let currentData = moment();
    let isInvalidAge = false;

    ////////////////////////////////////////////////////////////////////////

    // IMPLEMENTARE IL CHECK SULLA DATA
    // if (
    //   !moment(data.birthDate, true).isValid() ||
    //   currentData.diff(data.birthDate, "years") < 16
    // ) {
    //   isInvalidAge = true;
    // }

    ////////////////////////////////////////////////////////////////////////

    // Check se l'input password è stato modificato, se non modificato non viene messo nella put
    if (data.password === null || data.password === undefined || data.password === "") {
      data.password = userInfo.password
      newObj = {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        email: data.email,
      }
    }

    // PUT API
    response = await updateUser(newObj)
    console.log("RESPONSE", response)

    if (response.status === 200) {
      dispatch(
        setUserCredentials({
          name: data.firstName,
          surname: data.lastName,
          birthDate: data.birth_date,
          email: data.email,
          cartItems: userInfo.cartItems,
          adresses: userInfo.adresses,
          password: data.password,
          isLogged: true,
        })
      );

      const refresh = await refreshToken()
      dispatch(
        setToken({
          token: refresh.data.token,
          refreshToken: refresh.data.refreshToken
        })
      )

      setLocalStorage("token", refresh.data.token)
      setLocalStorage("refreshToken", refresh.data.refreshToken)

      console.log("REFRESH", refresh)
    }
    console.log("RESPONSE", response)

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
    <form className="login-form" onSubmit={ handleSubmit(onSubmit, onError) }>
      <div className="login-form__input-container">

        <InputTextField
          inputName="email"
          defaultValueInput={ userInfo.email }
          inputLabel="INDIRIZZO E-MAIL:"
          inputType="text"
          inputPlaceholder="Email"
          register={ register }
          labelStyle="default-label  "
          inputStyle={ `default-input margin-top-small` }
        />

        <InputTextField
          inputName="firstName"
          defaultValueInput={ userInfo.name }
          inputLabel="NOME:"
          inputType="text"
          inputPlaceholder="Nome"
          register={ register }
          labelStyle="default-label  "
          inputStyle={ `default-input margin-top-small` }
        />

        <InputTextField
          inputName="lastName"
          defaultValueInput={ userInfo.surname }
          inputLabel="COGNOME:"
          inputType="text"
          inputPlaceholder="Cognome"
          register={ register }
          labelStyle="default-label  "
          inputStyle={ `default-input margin-top-small` }
        />


        <InputTextField
          inputName="birthDate"
          defaultValueInput={ userInfo.birthDate }
          inputLabel="DATA DI NASCITA:"
          inputType="date"
          inputPlaceholder="Data di nascita"
          register={ register }
          isRequired={ true }
          labelStyle="default-label margin-top-extra"
          inputStyle={ `default-input margin-top-small ${state.invalidAge ? "default-input--error" : ""
            }` }
        />

        <InputPasswordField
          inputName="password"
          defaultValueInput={ userInfo.password }
          inputLabel="NUOVA PASSWORD:"
          inputType="password"
          inputPlaceholder="Password"
          register={ register }
          regexValidation={ passwordReg }
          // isRequired={ true }
          labelStyle="default-label password-margin-top margin-top-extra"
          inputStyle={ `default-input ${state.isInvalidNewPassword ? "default-input--error" : ""
            }` }
        />
      </div>

      <Button
        label="Salva Credenziali"
        buttonStyle="submit-button button-margin-top"
      />
    </form>

  );
}

ChangeUserDataForm.defaultProps = {};

ChangeUserDataForm.propTypes = {};

export default ChangeUserDataForm;
