import React from 'react';
import PropTypes from 'prop-types';
import "./accordionItem.scss";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AccordionItem(props) {
    return (
        <>
            <div className='accordion'>
                <Accordion sx={{ boxShadow: "none" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='accordion__summary'
                    >
                        <h2 className='accordion__title'>Descrizione</h2>
                    </AccordionSummary>
                    <AccordionDetails className='accordion__details'>
                        <p className='accordion__answer'>
                            {props.productDescription}
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