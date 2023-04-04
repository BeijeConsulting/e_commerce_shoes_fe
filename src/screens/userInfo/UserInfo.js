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
import i18n from "../../assets/translations/i18n";

function UserInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const lang = i18n.language.slice(0, 2);

  const token = useSelector((state) => state.tokenDuck.token);
  // const tokenStorage = getLocalStorage("token")

  const { t } = useTranslation()

  // if user is not logged --> go to homepage
  useEffect(() => {
    if (!token) navigate(`/${lang}`);
  }, [token])

  return (
    <div className='userInfo'>
      <Seo
        title={t("userInfo.title")}
        description="FAQ"
        content="e-commerce"
      />
      <h1>{t("userInfo.myAccount")}</h1>

      <div className='userInfo__navlink'>
        <NavLink
          to={"indirizzi"}
          className={"customer__list"}
        >
          {t("userInfo.addresses")}
        </NavLink>

        <NavLink
          to={""}
          className={"customer__list"}
        >
          {t("userInfo.personalData")}
        </NavLink>

        <NavLink
          to={"ordini"}
          className={`customer__list ${location.pathname === `user-info/order-list` ? "active" : ""
            }`}
        >
          <p>{t("userInfo.orderList")}</p>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}


UserInfo.defaultProps = {};

UserInfo.propTypes = {};

export default UserInfo;
