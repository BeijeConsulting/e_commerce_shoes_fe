import React, { useState } from "react";
import PropTypes from "prop-types";
import ChangeUserDataForm from "../../components/hookComponents/changeUserDataForm/ChangeUserDataForm";
import "./personalData.scss";
import Button from "../../components/functionalComponents/button/Button";
import { useSelector } from "react-redux";

function PersonalData() {
  const [state, setState] = useState({
    showForm: false,
  });

  const userData = useSelector((state) => state.userDuck);

  console.log("personal data", userData);

  function toggleForm() {
    setState({ showForm: !state.showForm });
  }
  return (
    <div>
      <h2>Dati Anagrafici</h2>

      <ul>
        <li>{userData?.name}</li>
        <li>{userData?.surname}</li>
        <li>
          {`${userData?.birthDate?.dayOfMonth
            ?.toString()
            ?.padStart(2, "0")}/${userData?.birthDate?.monthValue
            ?.toString()
            .padStart(2, "0")}/${userData?.birthDate?.year}`}
        </li>
      </ul>

      <h2>Dati Account</h2>
      <ul>
        <li>{userData?.email}</li>
      </ul>

      {state.showForm && <ChangeUserDataForm />}
      <Button
        label={state.showForm ? "ANNULLA" : "MODIFICA DATI"}
        handleClick={toggleForm}
        buttonStyle="submit-button"
      />
    </div>
  );
}

PersonalData.defaultProps = {};

PersonalData.propTypes = {};

export default PersonalData;
