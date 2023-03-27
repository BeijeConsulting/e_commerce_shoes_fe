import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import ChangeUserDataForm from "../../components/hookComponents/changeUserDataForm/ChangeUserDataForm";
import Button from "../../components/functionalComponents/button/Button";
import "./personalData.scss";

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
    <div className='personalData'>
      <h1>I tuoi Dati Personali</h1>
      <h2>Dati Anagrafici</h2>

      <ul>
        <li>
          Nome:
          <span>
            { userData?.name }
          </span>
        </li>
        <li>
          Nome:
          <span>
            { userData?.surname }
          </span>
        </li>
        <li>
          Data di nascita:
          <span>
            { `${userData?.birthDate?.dayOfMonth
              ?.toString()
              ?.padStart(2, "0")}/${userData?.birthDate?.monthValue
                ?.toString()
                .padStart(2, "0")}/${userData?.birthDate?.year}` }
          </span>
        </li>
      </ul>

      <h2>Dati Account</h2>
      <ul>
        <li>Email:
          <span className='personalData__email'>
            { userData?.email }
          </span>
        </li>
      </ul>

      { state.showForm && <ChangeUserDataForm /> }
      <div className='container__button'>
        <Button
          label={ state.showForm ? "ANNULLA" : "MODIFICA DATI" }
          handleClick={ toggleForm }
          buttonStyle="default-button"
        />
      </div>
    </div>
  );
}

PersonalData.defaultProps = {};

PersonalData.propTypes = {};

export default PersonalData;
