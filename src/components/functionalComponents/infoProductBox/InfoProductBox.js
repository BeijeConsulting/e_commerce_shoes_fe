import React from 'react';
import { FiTruck } from "react-icons/fi";
import { BiPackage } from "react-icons/bi"
import "./infoProductBox.scss";

function InfoProductBox() {
    return (
        <div className='infoBox'>

            <div className='infoBox__container'>
                <span>
                    <FiTruck />
                </span>
                <p>consegna gratuita</p>
            </div>
            <div className='infoBox__container'>
                <span>
                    <BiPackage />
                </span>
                <p>resi gratuiti</p>
            </div>
        </div>
    )
}

export default InfoProductBox