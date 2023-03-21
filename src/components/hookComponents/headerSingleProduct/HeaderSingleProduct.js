import React from 'react';

import "./headerSingleProduct.scss"
import SingleProductSlider from '../singleProductSlider/SingleProductSlider';
import InfoProductBox from '../../functionalComponents/infoProductBox/InfoProductBox';

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
                    <p className='info__p'>Bottone acquista</p>
                    <p className='info__p'>Tabella Taglie Link</p>
                    <p className='info__p'>Accordion</p>
                </div>
            </div>

        </div>
    )
}

export default HeaderSingleProduct