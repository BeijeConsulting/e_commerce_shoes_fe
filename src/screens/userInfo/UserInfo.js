import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import "./userInfo.scss";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function UserInfo() {
  const location = useLocation();
  console.log(location);

  return (
    <div>
      <h1>IL MIO ACCOUNT</h1>

      {/* Form */}

      <NavLink
        to={"address-list"}
        className={`customer__list ${
          location.pathname === `user-info/address-list` ? "active" : ""
        }`}
      >
        <p>Indirizzi</p>
      </NavLink>
      <NavLink
        to={"/user-info"}
        className={`customer__list ${
          location.pathname === `user-info` ? "active" : ""
        }`}
      >
        <p>Dati Personali</p>
      </NavLink>

      <NavLink
        to={"order-list"}
        className={`customer__list ${
          location.pathname === `user-info/order-list` ? "active" : ""
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
