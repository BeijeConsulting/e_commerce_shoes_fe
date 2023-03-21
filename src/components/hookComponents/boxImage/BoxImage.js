import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../../functionalComponents/button/Button';
import "./boxImage.scss"

function BoxImage(props) {

    const navigate = useNavigate();

    const goTo = function () {
        navigate(props.goTo);
    };
    return (
        <div className='box__container'>
            <img src={ props.image }
                alt="nuovi arrivi"
            />
            <div className="box__container__info">
                <h2>nuovi arrivi</h2>
                <h2>lifestyle</h2>
                <p>Sopri le nuove collezioni</p>

                <Button
                    label={ "scopri di più" }
                    buttonStyle={ "default-button" }
                    handleClick={ goTo }
                />
            </div>
        </div>
    )
}

BoxImage.defaultProps = {

}

BoxImage.propTypes = {

}

export default BoxImage