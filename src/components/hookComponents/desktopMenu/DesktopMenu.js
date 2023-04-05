import React from "react";
import "./desktopMenu.scss";

import { useNavigate } from "react-router-dom";
import i18n from "../../../assets/translations/i18n";

function DesktopMenu(props) {
  const navigate = useNavigate();
  const lang = i18n.language.slice(0, 2);

  function mapDesktopMenu(item, key) {
    let path = `scarpe/${item.path}`;
    if (item.bottom === false) {
      if (item.path === "brand") path = `/${lang}/brand`;
      return (
        <li key={`${key}-${Math.random()}`} onClick={() => goTo(path)}>
          <div>{item.top}</div>
        </li>
      );
    }

    if (item.bottom === true) {
      return (
        <li key={`${key}-${Math.random()}`}>
          <div onClick={() => goTo(`scarpe/${item.path}`)}>{item.top}</div>
          <div className="main-header__menu__sub">
            {<ul>{mapDesktopSubMenu(item.path)}</ul>}
          </div>
        </li>
      );
    }
  }

  function mapDesktopSubMenu(path) {
    return props.categories.map(function (item, key) {
      return (
        <li
          key={`${key}-${Math.random()}`}
          onClick={() => goTo(`scarpe/${path}/${item.path}`)}
        >
          <div>{item.anchor}</div>
        </li>
      );
    });
  }

  function goTo(path) {
    navigate(path);
  }

  return (
    <ul
      className={`main-header__menu ${!!props.fullWidthInput ? "d-none" : ""}`}
    >
      {props.menu.map(mapDesktopMenu)}
    </ul>
  );
}

export default DesktopMenu;
