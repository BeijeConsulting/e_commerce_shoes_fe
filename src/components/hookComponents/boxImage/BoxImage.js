import React from 'react';
import boxImage from "../../../assets/images/box/boxNuoviArrivi.jpeg";
import "./boxImage.scss"

function BoxImage() {
    return (
        <div className='box__container'>
            <img src={ boxImage } alt="nuovi arrivi" />
        </div>
    )
}

export default BoxImage