import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../functionalComponents/button/Button';
import "./boxImage.scss"
import { useTranslation } from 'react-i18next';

function BoxImage(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    function goTo() {
        navigate(props.goTo);
    };

    return (
        <div className='box__container'>
            <img src={props.image}
                alt="nuovi arrivi"
            />
            <div className="box__container__info">
                <h2>{props.boxTitle}</h2>
                <p>{t("boxImage.cta")}</p>

                <Button
                    label={t("sliderHomepage.lookNow")}
                    buttonStyle={"default-button"}
                    handleClick={goTo}
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