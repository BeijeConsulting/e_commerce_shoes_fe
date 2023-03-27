import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Redux
import { useSelector } from "react-redux";
// Router
import { useNavigate } from 'react-router-dom';
// Utils
import { getLocalStorage } from '../../utils/localStorageUtils';
// SCSS
import "./adressList.scss";

function AdressList(props) {
  const userData = useSelector((state) => state.userDuck);
  const navigate = useNavigate()

  // if user is not logged --> go to identityScreen 
  useEffect(() => {
    const localStorage = getLocalStorage("token")
    if (!localStorage) navigate("/identity")
  }, [])


  function mapList(data, i) {
    return (
      <div className='address__container' key={ data.id }>
        <h3>Indirizzo n. { i + 1 }</h3>
        <ul>
          <li>
            <p className='address__p'>Paese:</p>
            <span>
              { data?.country }
            </span>
          </li>
          <li>
            <p className='address__p'>Cap:</p>
            <span>
              { data?.zipcode }
            </span>
          </li>
          <li>
            <p className='address__p'>Nome e cognome:</p>
            <span>
              { data?.name_surname }
            </span>
          </li>
          <li>
            <p className='address__p'>Indirizzo:</p>
            <span>
              { data?.street_address }
            </span>
          </li>
          <li>
            <p className='address__p'>Numero di telefono:</p>
            <span>
              { data?.telephone }
            </span>
          </li>
          <li>
            <p className='address__p'>Istruzioni per il corriere:</p>
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
      <h2>I tuoi Indirizzi</h2>
      { userData.adresses?.map(mapList) }
      { userData.adresses?.length === 0 && <div>
        <p>Non hai inserito nessun indirizzo.</p>
      </div> }
    </div>
  );
}

AdressList.defaultProps = {};

AdressList.propTypes = {};

export default AdressList;
