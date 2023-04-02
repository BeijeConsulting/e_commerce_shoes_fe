import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import ChangeUserDataForm from "../../components/hookComponents/changeUserDataForm/ChangeUserDataForm";
import Button from "../../components/functionalComponents/button/Button";
import "./personalData.scss";
import { useTranslation } from 'react-i18next';

function PersonalData() {
  const [state, setState] = useState({
    showForm: false,
  });

  function toggleForm() {
    setState({ showForm: !state.showForm });
  }

  const userData = useSelector((state) => state.userDuck);
  console.log("USERDATA", userData);

  const { t } = useTranslation()


  return (
    <div className='personalData'>
      <h1>{ t("personalData.personalData") }</h1>
      <div className='personalData__container'>

        <ul>
          <h2>{ t("personalData.personalDetails") }</h2>
          <li>
            { t("personalData.name") }:
            <span>
              { userData?.name }
            </span>
          </li>
          <li>
            { t("personalData.lastName") }:
            <span>
              { userData?.surname }
            </span>
          </li>
          <li>
            { t("personalData.birdthDate") }:
            <span>
              { userData?.birthDate }
            </span>
          </li>
        </ul>

        <ul>
          <h2>{ t("personalData.accountData") }</h2>
          <li>{ t("personalData.email") }:
            <span className='personalData__email'>
              { userData?.email }
            </span>
          </li>
        </ul>
      </div>

      { state.showForm && <ChangeUserDataForm /> }
      <div className='container__button' >
        <Button
          label={ state.showForm ? t("button.cancel") : t("button.editData") }
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
