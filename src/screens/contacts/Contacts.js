import React from 'react';
import PropTypes from 'prop-types';
import "./contacts.scss";
import { Link, NavLink } from 'react-router-dom';

function Contacts() {
    return (
        <div className='contacts'>
            <h1>Contatti</h1>
            <h3>
                Se hai difficoltà o dubbi relativi allo shop online, il nostro Servizio Clienti è a tua disposizione. Scopri come contattarci cliccando <span>
                    <Link to={"/"}>
                        quì.
                    </Link>
                </span>
            </h3>
        </div>
    )
}

Contacts.defaultProps = {

}

Contacts.propTypes = {

}

export default Contacts;