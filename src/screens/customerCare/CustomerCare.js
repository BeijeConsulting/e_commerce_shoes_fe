import React from 'react';
// Router
import { Outlet, useLocation } from "react-router";
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import "./customerCare.scss"

// i18Next
import { useTranslation } from 'react-i18next';
import Seo from '../../components/functionalComponents/Seo';


function CustomerCare() {
    const location = useLocation();
    const { t } = useTranslation()

    const data = [
        {
            title: t("customerCare.contacts"),
            link: "contacts",
        },
        {
            title: t("customerCare.delivery"),
            link: "delivery",
        },
        {
            title: t("customerCare.returnsAndRefunds"),
            link: "returns"
        },
        {
            title: "FAQ",
            link: "faq"
        },
    ]

    function mapList(data, i) {
        return (
            <li key={ i }>
                <NavLink to={ data.link }
                    className={ `customer__list ${location.pathname === `customerCare/${data.link}` ? "active" : ""}` }
                >
                    { data.title }
                </NavLink>
            </li>
        )
    }

    return (
        <div className='customer'>
            <Seo
                title="Cutomer care"
                description="E-commerce di scarpe italiane"
                content="e-commerce"
            />
            <header>
                <h2>Ciao,<br />come possiamo aiutarti?
                </h2>
                <p>Nella sezione FAQ puoi trovare più velocemente la risposta alle tue domande. Inoltre, potrai seguire la tua spedizione oppure avere tutte le informazioni necessarie sui resi e rimborsi.</p>
            </header>

            <div className='customer__content'>
                <div className='customer__advice'>
                    <h2>Servizio Clienti</h2>
                    <ul>
                        { data.map(mapList) }
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