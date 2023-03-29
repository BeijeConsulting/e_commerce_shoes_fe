import React from 'react';
import PropTypes from 'prop-types';
import "./contacts.scss";
import { Link, NavLink } from 'react-router-dom';
import Seo from '../../components/functionalComponents/Seo';

function Contacts() {
    return (
        <div className='contacts'>
            <Seo
                title="Contatti"
                description="Tutti i conttatti di Belle Scarpe"
                content="e-commerce"
            />
            <h1>Contatti</h1>
            <h3>
                Se hai difficoltà o dubbi relativi allo shop online, il nostro Servizio Clienti è a tua disposizione. Scopri come contattarci cliccando <span>
                    <Link to={ "/" }>
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