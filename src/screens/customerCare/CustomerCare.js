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
            link: "contatti",
        },
        {
            title: t("customerCare.delivery"),
            link: "spedizioni",
        },
        {
            title: t("customerCare.returnsAndRefunds"),
            link: "resi"
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
                <h2>{ t("customerCare.hi") }<br />{ t("customerCare.help") }
                </h2>
                <p>{ t("customerCare.p") }</p>
            </header>

            <div className='customer__content'>
                <div className='customer__advice'>
                    <h2>{ t("customerCare.service") }</h2>
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