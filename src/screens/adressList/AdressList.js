import React, { useState } from "react";
// import PropTypes from "prop-types";

// Redux
import { useDispatch, useSelector } from "react-redux";
// Router
// import { useNavigate } from "react-router-dom";
// Utils

// SCSS
import "./addressList.scss";

import { useTranslation } from "react-i18next";
import Seo from "../../components/functionalComponents/Seo";
import InputTextField from "../../components/functionalComponents/inputTextField/InputTextField";
import { useForm } from "react-hook-form";
import Button from "../../components/functionalComponents/button/Button";
import { setUserCredentials } from "../../redux/ducks/userDuck";
import { addAddress, deleteAddress } from "../../services/addressServices";
import { getUserAuth } from "../../services/authServices";

function AdressList() {
  const [state, setState] = useState({
    showForm: false,
    invalidAddress: false,
    invalidCountry: false,
    invalidZipCode: false,
    invalidName_Surname: false,
    invalidTelephone: false,
  });

  const { register, handleSubmit } = useForm();
  // const token = useSelector((state) => state.tokenDuck.token);
  const userData = useSelector((state) => state.userDuck);

  // console.log("USERDATA", userData);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  // if user is not logged --> go to identityScreen
  /* useEffect(() => {
    if (!token) navigate(`/${lang}/accedi`)
  }, []) */

  const onSubmit = async (data) => {
    // console.log(data);

    let newObj = {
      country: data.country,
      name_surname: data.name_surname,
      street_address: data.address,
      telephone: data.telephone,
      zipcode: data.zipCode,
      // userId: 0,
      //instructions: "nothing",
      //label: "string",
    };

    // POST ADDRESS
    const response = await addAddress(newObj);

    if (response.status === 200) {
      let newObj = {
        id: response.data?.id,
        country: response.data?.country,
        name_surname: response.data?.name_surname,
        street_address: response.data?.street_address,
        telephone: response.data?.telephone,
        zipcode: response.data?.zipcode,
        // userId: 0,
        //instructions: "nothing",
        //label: "string",
      };
      if (userData.adresses) {
        dispatch(
          setUserCredentials({
            ...userData,
            adresses: [...userData.adresses, newObj],
          })
        );
      } else {
        dispatch(
          setUserCredentials({
            ...userData,
            adresses: [newObj],
          })
        );
      }

      // console.log("NEWOBJ", newObj);
      // console.log("RESPONSE ADDRESS", response);

      setState({
        ...state,
        showForm: false,
        invalidAddress: false,
        invalidCountry: false,
        invalidZipCode: false,
        invalidName_Surname: false,
        invalidTelephone: false,
      });
    }

    ////////////////////////////////////////////////////////////////

    // IMPLEMENTARE ERRORI E CAMPI OBBLIGATORI

    ////////////////////////////////////////////////////////////////
  };
  const onError = async (err) => {
    setState({
      ...state,
      invalidAddress: err?.address ? true : false,
      invalidCountry: err?.country ? true : false,
      invalidZipCode: err?.zipCode ? true : false,
      invalidName_Surname: err?.name_surname ? true : false,
      invalidTelephone: err?.telephone ? true : false,
    });
  };

  const deleteAddressId = (id) => async () => {
    const response = await deleteAddress(id);

    if (response.status === 200) {
      // console.log("SUCCESS DELETE");

      const response = await getUserAuth();
      // console.log("USER IN IF", response);

      dispatch(
        setUserCredentials({
          ...userData,
          adresses: [...response.data.addresses],
        })
      );
    }
    // console.log(id);
    // console.log("RESPONSE", response);
  };

  function toggleForm() {
    setState({ ...state, showForm: !state.showForm });
  }

  function mapList(data, i) {
    return (
      <div className="address__container__list" key={data?.id}>
        <Seo
          title={t("addresses.address")}
          description="Gestione degli indirizzi personali"
          content="e-commerce"
        />
        <h3>
          {t("addresses.address")} n. {i + 1}
        </h3>
        <ul>
          <li>
            <p className="address__p">{t("addresses.country")}:</p>
            <span>{data?.country ?? "n/d"}</span>
          </li>
          <li>
            <p className="address__p">{t("addresses.zipCode")}:</p>
            <span>{data?.zipcode ?? "n/d"}</span>
          </li>
          <li>
            <p className="address__p">{t("addresses.nameAndLastName")}:</p>
            <span>{data?.name_surname ?? "n/d"}</span>
          </li>
          <li>
            <p className="address__p">{t("addresses.address")}:</p>
            <span>{data?.street_address ?? "n/d"}</span>
          </li>
          <li>
            <p className="address__p">{t("addresses.telephone")}:</p>
            <span>{data?.telephone ?? "n/d"}</span>
          </li>
          <li>
            <p className="address__p">{t("addresses.deliveryInstructions")}:</p>
            <span>{data?.instructions ?? "n/d"}</span>
          </li>
          <p className="delete" onClick={deleteAddressId(data?.id)}>
            Delete
          </p>
        </ul>
      </div>
    );
  }

  return (
    <div className="address">
      {!!state.showForm &&
        <form className="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
          <InputTextField
            inputName="address"
            inputLabel={t("addresses.address") + "*"}
            inputType="text"
            inputPlaceholder="Es: Via Rossi 14"
            register={register}
            isRequired={true}
            labelStyle="default-label"
            inputStyle={`default-input margin-top-small ${state.invalidAddress ? "default-input--error" : ""
              }`}
          />
          <InputTextField
            inputName="country"
            inputLabel={t("addresses.country") + "*"}
            inputType="text"
            inputPlaceholder="Es: Italia"
            register={register}
            isRequired={true}
            labelStyle="default-label  "
            inputStyle={`default-input margin-top-small ${state.invalidCountry ? "default-input--error" : ""
              }`}
          />
          <InputTextField
            inputName="zipCode"
            inputLabel={t("addresses.zipCode") + "*"}
            inputType="text"
            inputPlaceholder="Es: 13000"
            register={register}
            isRequired={true}
            labelStyle="default-label  "
            inputStyle={`default-input margin-top-small ${state.invalidZipCode ? "default-input--error" : ""
              }`}
          />
          <InputTextField
            inputName="name_surname"
            inputLabel={t("addresses.nameAndLastName") + "*"}
            inputType="text"
            inputPlaceholder="Es: Mario Rossi"
            register={register}
            isRequired={true}
            labelStyle="default-label  "
            inputStyle={`default-input margin-top-small ${state.invalidName_Surname ? "default-input--error" : ""
              }`}
          />
          <InputTextField
            inputName="instructions"
            inputLabel={t("addresses.deliveryInstructions")}
            inputType="text"
            inputPlaceholder="Es: consegnare in ufficio"
            register={register}
            labelStyle="default-label  "
            inputStyle={`default-input margin-top-small`}
          />
          <InputTextField
            inputName="telephone"
            inputLabel={t("addresses.telephone")}
            inputType="text"
            inputPlaceholder="Es: 333 1234567"
            register={register}
            isRequired={true}
            labelStyle="default-label  "
            inputStyle={`default-input margin-top-small ${state.invalidTelephone ? "default-input--error" : ""
              }`}
          />
          <Button
            label={t("button.saveAddress")}
            buttonStyle="submit-button button-margin-top"
          />
        </form>
      }
      <h2>{t("addresses.yourAddresses")}</h2>
      {userData.adresses?.map(mapList)}
      {userData.adresses?.length === 0 && (
        <div>
          <p>{t("addresses.emptyAddress")}.</p>
        </div>
      )}
      <div className="address__container">
        <Button
          label={state.showForm ? t("button.cancel") : t("button.addAddress")}
          handleClick={toggleForm}
          buttonStyle="default-button"
        />
      </div>
    </div>
  );
}

AdressList.defaultProps = {};

AdressList.propTypes = {};

export default AdressList;
