import React from 'react';
import SliderHomepage from '../sliderHomepage/SliderHomepage';
import shoe1 from "../../../assets/images/singleProduct/shoe1.jpeg"
import shoe2 from "../../../assets/images/singleProduct/shoe1.jpeg"
import shoe3 from "../../../assets/images/singleProduct/shoe1.jpeg"

import "./headerSingleProduct.scss"
import SingleProductSlider from '../singleProductSlider/SingleProductSlider';

function HeaderSingleProduct(props) {
    return (
        <div className='header'>
            <div className='header__container'>
                <p className='header__category'>scarpa sneakers</p>
                <p className='header__price'>99.99$</p>
            </div>

            <h2 className='header__brand'>Nike</h2>
            <p className='header__name'>zoom superfly 9 mds academy fg m</p>


            <SingleProductSlider />


        </div>
    )
}

export default HeaderSingleProduct