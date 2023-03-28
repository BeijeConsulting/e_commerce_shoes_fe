import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useNavigate, useParams } from "react-router-dom";
import i18n, { switchLang } from '../../../assets/translations/i18n';
import { setLanguage } from '../../../redux/ducks/languageDuck';


function SwitchLanguage(props) {
    const [selected, setSelected] = useState('it');

    const currentLanguage = useSelector((state) => state.languageDuck.currentLanguage)
    // console.log(currentLanguage)

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
        <div>
            <button onClick={ selectLanguage("it") }>
                IT
            </button>
            <button onClick={ selectLanguage("en") }>
                EN
            </button>
        </div>
    )
}

export default SwitchLanguage