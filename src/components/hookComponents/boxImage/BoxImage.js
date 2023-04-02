import React from 'react';
import PropTypes from 'prop-types';

// Router
import { useNavigate } from 'react-router-dom';
// Components
import Button from '../../functionalComponents/button/Button';
// i18ns
import { useTranslation } from 'react-i18next';
// SCSS
import "./boxImage.scss"

function BoxImage(props) {
    const { t } = useTranslation()

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
                <h2>{ t("boxImages.newArrives") }</h2>
                <p>{ t("boxImages.discover") }</p>

                <Button
                    label={ t("button.more") }
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