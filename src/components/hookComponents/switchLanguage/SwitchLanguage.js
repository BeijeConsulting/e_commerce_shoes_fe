import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

// Router
import { useLocation, useNavigate, useParams } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../../redux/ducks/languageDuck';
// i18n
import i18n, { switchLang } from '../../../assets/translations/i18n';
import italian from "../../../assets/images/svg/italian.svg"
import english from "../../../assets/images/svg/english.svg"
// SCSS
import "./switchLanguage.scss"


function SwitchLanguage(props) {
    const [selected, setSelected] = useState('it');

    const currentLanguage = useSelector((state) => state.languageDuck.currentLanguage)

    useEffect(() => {
        if (!localStorage.getItem("currentLanguage")) {
            localStorage.setItem("currentLanguage", i18n.language.slice(0, 2))
        }

        setSelected(currentLanguage);
    }, [currentLanguage]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { lang } = useParams();
    const { pathname } = useLocation();



    const selectLanguage = (code) => async () => {
        await switchLang(code);
        dispatch(setLanguage({ currentLanguage: code }));
        navigate(`/${code}${pathname.replace(`${lang}/`, "")}`);
    }


    return (
        <div className='switchLanguage'>

            <div className='switchLanguage__container' >
                <div className='switchLanguage__lang' onClick={ selectLanguage("it") } >
                    <span>
                        IT
                    </span>

                    <img src={ italian } alt='icon' />
                </div>
            </div>

            <div className='switchLanguage__container'  >
                <div className='switchLanguage__lang' onClick={ selectLanguage("en") }>
                    <span>
                        EN
                    </span>

                    <img src={ english } alt='icon' />
                </div>
            </div>


        </div>
    )
}

SwitchLanguage.defaultProps = {

}

SwitchLanguage.propTypes = {

}

export default SwitchLanguage