import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Redux
import { useSelector } from "react-redux";
// Router
import { useNavigate } from 'react-router-dom';
// Utils

// SCSS
import "./adressList.scss";
import { useTranslation } from 'react-i18next';
import Seo from '../../components/functionalComponents/Seo';

function AdressList(props) {
  // const token = useSelector((state) => state.tokenDuck.token)
  const userData = useSelector((state) => state.userDuck);
  const navigate = useNavigate()

  const { t } = useTranslation()

  // if user is not logged --> go to identityScreen 
  /* useEffect(() => {
    if (!token) navigate("/identity")
  }, []) */


  function mapList(data, i) {
    return (
      <div className='address__container' key={ data.id }>
        <Seo
          title="I tuoi indirizzi"
          description="Gestione degli indirizzi personali"
          content="e-commerce"
        />
        <h3>{ t("addresses.address") } n. { i + 1 }</h3>
        <ul>
          <li>
            <p className='address__p'>{ t("addresses.country") }:</p>
            <span>
              { data?.country }
            </span>
          </li>
          <li>
            <p className='address__p'>{ t("addresses.zipCode") }:</p>
            <span>
              { data?.zipcode }
            </span>
          </li>
          <li>
            <p className='address__p'>{ t("addresses.nameAndLastName") }:</p>
            <span>
              { data?.name_surname }
            </span>
          </li>
          <li>
            <p className='address__p'>{ t("addresses.address") }:</p>
            <span>
              { data?.street_address }
            </span>
          </li>
          <li>
            <p className='address__p'>{ t("addresses.telephone") }:</p>
            <span>
              { data?.telephone }
            </span>
          </li>
          <li>
            <p className='address__p'>{ t("addresses.deliveryInstructions") }:</p>
            <span>
              { data?.instructions }
            </span>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className='address'>
      <h2>{ t("addresses.yourAddresses") }</h2>
      { userData.adresses?.map(mapList) }
      { userData.adresses?.length === 0 && <div>
        <p>{ t("addresses.emptyAddress") }.</p>
      </div> }
    </div>
  );
}

AdressList.defaultProps = {};

AdressList.propTypes = {};

export default AdressList;
