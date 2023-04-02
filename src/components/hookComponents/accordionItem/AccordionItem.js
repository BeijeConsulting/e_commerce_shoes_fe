import React from 'react';
import PropTypes from 'prop-types';

// MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Library
import { useTranslation } from 'react-i18next';
// SCSS
import "./accordionItem.scss";

function AccordionItem(props) {

    const { t } = useTranslation()

    const dataSingleProduct = [
        {
            title: t("accordion.description"),
            answer: "Nike Court Vision Low è un classico rivisitato con materiali riciclati per almeno il 20% del suo peso, mentre la tomaia e gli strati esterni cuciti mantengono l'essenza dello stile originale. Il morbido collare a taglio basso assicura eleganza e comfort perfetti.",
            id: 1
        },
        {
            title: t("accordion.brand"),
            answer: "Nike",
            id: 2
        },
        {
            title: t("accordion.details"),
            answer: "Converse Court Vision Low è un classico rivisitato con materiali riciclati per almeno il 20% del suo peso, mentre la tomaia e gli strati esterni cuciti mantengono l'essenza dello stile originale. Il morbido collare a taglio basso assicura eleganza e comfort perfetti.",
            id: 3
        },
    ]

    function mapList(data) {
        return (
            <div className='accordion' key={ data.id }>
                <Accordion sx={ { boxShadow: "none" } }>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon /> }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='accordion__summary'
                    >
                        <h2 className='accordion__title'>{ data.title }</h2>
                    </AccordionSummary>
                    <AccordionDetails className='accordion__details'>
                        <p className='accordion__answer'>
                            { data.answer }
                        </p>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }

    return (
        <>
            { dataSingleProduct.map(mapList) }
        </>
    )
}

AccordionItem.defaultProps = {

}

AccordionItem.propTypes = {

}

export default AccordionItem