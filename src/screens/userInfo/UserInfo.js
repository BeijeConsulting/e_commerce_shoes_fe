import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Router
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
// Utils
import { getLocalStorage } from '../../utils/localStorageUtils';
// SCSS
import "./userInfo.scss";
import { useTranslation } from 'react-i18next';

function UserInfo(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation()

  // if user is not logged --> go to identityScreen 
  useEffect(() => {
    const localStorage = getLocalStorage("token")
    if (!localStorage) navigate("/identity")
  }, [])


  return (
    <div className='userInfo'>
      <h1>IL MIO ACCOUNT</h1>

      {/* Form */}

      <NavLink

        to={"address-list"}
        className={"customer__list"}
      >
        { t("userInfo.addresses") }
      </NavLink>
      <NavLink

        to={"/user-info"}
        className={"customer__list"}
      >
        { t("userInfo.personalData") }
      </NavLink>

      <NavLink
        to={"order-list"}
        className={`customer__list ${location.pathname === `user-info/order-list` ? "active" : ""
          }`}
      >
        <p>Lista Ordini</p>
      </NavLink>

      <Outlet />
    </div>
  );
}

UserInfo.defaultProps = {};

UserInfo.propTypes = {};

export default UserInfo;
