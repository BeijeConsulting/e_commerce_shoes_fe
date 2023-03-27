import React from 'react';
// Router
import { Outlet, useLocation } from "react-router";
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import "./customerCare.scss"

// i18Next
import { changeLanguage } from 'i18next';


function CustomerCare() {

    const location = useLocation();
    console.log(location);

    const data = [
        {
            title: "Chi siamo",
            link: "about-us"
        },
        {
            title: "Termini e condizioni",
            link: "terms-and-condictions"
        },
        {
            title: "Privacy policy",
            link: "privacy"
        },
        {
            title: "Cookie policy",
            link: "cookie"
        },
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
            link: "returns"
        },
        {
            title: "FAQ",
            link: "faq"
        },
    ]

    function mapList(data) {
        return (
            <li>
                <NavLink to={data.link}
                    className={`customer__list ${location.pathname === `customerCare/${data.link}` ? "active" : ""}`}
                >
                    {data.title}
                </NavLink>
            </li>
        )
    }

    return (
        <div className='customer'>
            {/* Parte fissa */}
            <header>
                <h2>Ciao,<br />come possiamo aiutarti?
                </h2>
                <p>Nella sezione FAQ puoi trovare più velocemente la risposta alle tue domande. Inoltre, potrai seguire la tua spedizione oppure avere tutte le informazioni necessarie sui resi e rimborsi.</p>
            </header>

            <div className='customer__content'>
                <div className='customer__advice'>
                    <h2>Servizio Clienti</h2>
                    <ul>
                        {data.map(mapList)}
                    </ul>
                </div>
                <div className='customer__outlet'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

CustomerCare.defaultProps = {

}

CustomerCare.propTypes = {

}

export default CustomerCare;