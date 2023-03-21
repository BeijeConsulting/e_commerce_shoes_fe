import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../functionalComponents/button/Button"


import "./headerSingleProduct.scss"
import SingleProductSlider from '../singleProductSlider/SingleProductSlider';
import InfoProductBox from '../../functionalComponents/infoProductBox/InfoProductBox';
import AccordionItem from "../accordionItem/AccordionItem"


function HeaderSingleProduct(props) {
    return (
        <div className='header'>
            <div className='header__container'>
                <p className='header__category'>scarpa sneakers</p>
                <p className='header__price'>99.99$</p>
            </div>

            <h2 className='header__brand'>Nike</h2>
            <p className='header__name'>zoom superfly 9 mds academy fg m</p>


            <div className='info__container'>
                <SingleProductSlider />

                <div className='info'>

                    {/* DA SISTEMARE */ }
                    <p className='info__p'>Input Select taglie</p>
                    <InfoProductBox />

                    <Button
                        label={ "ACQUISTA ORA" }
                        buttonStyle={ "default-button" }
                    />
                    <p className='info__p'>Tabella Taglie Link</p>
                    <AccordionItem />
                </div>
            </div>

        </div>
    )
}

HeaderSingleProduct.defaultProps = {

}

HeaderSingleProduct.propTypes = {

}

export default HeaderSingleProduct