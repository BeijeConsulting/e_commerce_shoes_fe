import React from 'react';
// Router
import { Outlet, useLocation } from "react-router";
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import "./customerCare.scss"

// i18Next
import { useTranslation } from 'react-i18next';


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
                    <h2>{ t("customerCare.hi") },</h2>
                    <h3>{ t("customerCare.help") }?</h3>
                    <p>Nella sezione FAQ puoi trovare più velocemente la risposta alle tue domande. Inoltre, potrai seguire la tua spedizione oppure avere tutte le informazioni necessarie sui resi e rimborsi.</p>

                </div>
                <div className='customer__advice'>
                    <h2>{ t("customerCare.forYou") }</h2>
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