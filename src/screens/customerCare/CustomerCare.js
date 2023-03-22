import React from 'react';
import PropTypes from 'prop-types';
import "./customerCare.scss"

import { Outlet, useNavigate, useLocation } from "react-router";

import { Link, NavLink } from 'react-router-dom';
import { changeLanguage } from 'i18next';


function CustomerCare() {

    const location = useLocation();
    console.log(location);

    const data = [
        {
            title: "contatti",
            link: "contacts",
        },
        {
            title: "spedizioni",
            link: "delivery",
        },
        {
            title: "resi e rimborsi",
            link: "returnAndRefund"
        },
    ]

    function mapList(data) {
        return (
            <div
                key={ Math.floor(Math.random() * 10000) }
            >
                <NavLink to={ data.link }
                    className={ `customer__list ${location.pathname === `customerCare/${data.link}` ? "active" : ""}` }
                >
                    { data.title }
                </NavLink>

            </div>
        )
    }

    return (
        <div className='customer'>
            {/* Parte fissa */ }
            <div>
                <div className='customer__header'>
                    <h2>Ciao,</h2>
                    <h3>come possiamo aiutarti?</h3>
                    <p>Nella sezione FAQ puoi trovare più velocemente la risposta alle tue domande. Inoltre, potrai seguire la tua spedizione oppure avere tutte le informazioni necessarie sui resi e rimborsi.</p>

                </div>
                <div className='customer__advice'>
                    <h2>Consigliati per te </h2>
                    { data.map(mapList) }
                </div>

            </div>

            <div className='outlet'>
                <Outlet />
            </div>
        </div>
    )
}

CustomerCare.defaultProps = {

}

CustomerCare.propTypes = {

}

export default CustomerCare;