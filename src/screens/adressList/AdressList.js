import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import "./adressList.scss";

function AdressList(props) {
  const userData = useSelector((state) => state.userDuck);

  return (
    <div>
      <h2>I tui Indirizzi</h2>
    </div>
  );
}

AdressList.defaultProps = {};

AdressList.propTypes = {};

export default AdressList;
