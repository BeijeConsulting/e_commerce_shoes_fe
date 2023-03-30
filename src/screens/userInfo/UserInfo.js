import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Router
import { Outlet, useNavigate, useLocation, NavLink } from "react-router-dom";
// Utils
// SCSS
import "./userInfo.scss";
import { useTranslation } from 'react-i18next';
import Seo from '../../components/functionalComponents/Seo';
import { useSelector } from 'react-redux';
import { getLocalStorage } from '../../utils/localStorageUtils';

function UserInfo(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state) => state.tokenDuck.token);
  const tokenStorage = getLocalStorage("token")

  const { t } = useTranslation()

  // if user is not logged --> go to identityScreen 
  useEffect(() => {
    if (!tokenStorage) navigate("/identity")

    // console.log("TOKENstorage", tokenStorage)
    // console.log("TOKEN", token)
  }, [tokenStorage])

  return (
    <div className='userInfo'>
      <Seo
        title="Account Personale"
        description="Faq"
        content="e-commerce"
      />
      <h1>IL MIO ACCOUNT</h1>

      {/* Form */ }

      <NavLink
        to={ "address-list" }
        className={ "customer__list" }
      >
        { t("userInfo.addresses") }
      </NavLink>

      <NavLink
        to={ "" }
        className={ "customer__list" }
      >
        { t("userInfo.personalData") }
      </NavLink>

      <NavLink
        to={ "order-list" }
        className={ `customer__list ${location.pathname === `user-info/order-list` ? "active" : ""
          }` }
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
