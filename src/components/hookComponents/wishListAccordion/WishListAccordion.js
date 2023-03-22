import React from 'react';
import PropTypes from 'prop-types';
import "./wishListAccordion.scss";
import shoe1 from "../../../assets/images/productCardImg.jpg"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function WishListAccordion(props) {
    return (
        <div className='container__accordion'>
            <Accordion className='accordion'
                sx={ { boxShadow: "none" } }>
                <AccordionSummary
                    expandIcon={ <ExpandMoreIcon /> }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className='accordion__summary'
                >
                    <div className='accordion__summary--wrapper'>
                        <div className='accordion__info'>
                            <h3>ORDINE: </h3>
                            <p>697590 </p>
                        </div>
                        <div className='accordion__info'>
                            <h3>Destinatario: </h3>
                            <p>Luigi Lesca </p>
                        </div>
                        <div className='accordion__info'>
                            <h3>Prodotti: </h3>
                            <p>6 </p>
                        </div>
                        <div className='accordion__info'>
                            <h3>Totale: </h3>
                            <p>160.00$ </p>
                        </div>
                        <div className='accordion__info'>
                            <h3>Pagamento: </h3>
                            <p>Paypal
                                <span>PAGATO</span>
                            </p>
                        </div>
                        <div className='accordion__info'>
                            <h3>Stato: </h3>
                            <p>
                                <span className='accordion__stato'>
                                    CONSEGNATO
                                </span>
                            </p>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails >
                    <div className='accordion__details'>
                        <img
                            src={ shoe1 }
                            alt="wine bottle"
                        />
                        <h3>Nike Air Zoom</h3>
                    </div>

                    <div className='accordion__details--price'>
                        <p>160,00$</p>
                    </div>
                </AccordionDetails>
            </Accordion>

        </div>
    )
}

WishListAccordion.defaultProps = {

}

WishListAccordion.propTypes = {

}

export default WishListAccordion