import React, { useEffect } from "react";

// ROUTER
import { useLocation } from "react-router";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
// i18n
import i18n from "../../assets/translations/i18n";
import { useTranslation } from "react-i18next";
// SCSS
import "./identity.scss";

function Identity() {
  const lang = i18n.language.slice(0, 2);
  const { t } = useTranslation();
  const location = useLocation();
  console.log(location.pathname === `/${lang}/identity`);
  useEffect(() => {
    document.body.classList.add("background-grey");

    return () => {
      document.body.classList.remove("background-grey");
    };
  }, []);

  return (
    <div className="identity-wrapper">
      <h1>LOGO</h1>
      <div className="identity-container">
        <div className="identity-container__options">
          <div
            className={`identity-container__options__signup ${
              location.pathname === `/${lang}/accedi/registrati`
                ? "identity-container__options__signup--shown underline"
                : ""
            }`}
          >
            <Link
              className={`link ${
                location.pathname === `/${lang}/identity/signup`
                  ? "link--active"
                  : ""
              }`}
              to={"registrati"}
            >
              {t("login.signup")}
            </Link>
          </div>
          <div
            className={`identity-container__options__login  ${
              location.pathname === `/${lang}/accedi`
                ? "identity-container__options__login--shown underline"
                : ""
            }`}
          >
            <Link
              className={`link ${
                location.pathname === `/${lang}/identity` ? "link--active" : ""
              }`}
              to={""}
            >
              {t("login.signin")}
            </Link>
          </div>
        </div>
        <div className="identity-container__form-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Identity;
