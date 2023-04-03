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

    return (
        <>
            <div className='accordion'>
                <Accordion sx={ { boxShadow: "none" } }>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon /> }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='accordion__summary'
                    >
                        <h2 className='accordion__title'>{ t("accordion.description") }</h2>
                    </AccordionSummary>
                    <AccordionDetails className='accordion__details'>
                        <p className='accordion__answer'>
                            { props.productDescription }
                        </p>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    )
}

AccordionItem.defaultProps = {

}

AccordionItem.propTypes = {

}

export default AccordionItem