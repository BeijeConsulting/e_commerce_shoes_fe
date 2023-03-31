import React from 'react';
import './footer.scss';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SwitchLanguage from '../../hookComponents/switchLanguage/SwitchLanguage';


function Footer() {
    const { t } = useTranslation();

    const menu = [
        {
            header: 'Nome Sito',
            list: [
                {
                    anchor: t("footer.whoWeAre"),
                    path: "assistenza",
                },
                {
                    anchor: 'Login',
                    path: "accedi",
                },
                {
                    anchor: t("footer.registration"),
                    path: "accedi/registrati",
                },
            ]
        },
        {
            header: 'Privacy e Cookie',
            list: [
                {
                    anchor: 'Privacy policy',
                    path: "assistenza/privacy-policy",
                },
                {
                    anchor: 'Cookie policy',
                    path: "assistenza/cookie-policy",
                },
            ]
        },
        {
            header: t("footer.contacts"),
            list: [
                {
                    anchor: t("footer.serviceClient"),
                    path: "assistenza",
                },
                {
                    anchor: 'FAQ',
                    path: "assistenza/faq",
                },
                {
                    anchor: t("footer.termAndConditions"),
                    path: "assistenza/termini-condizioni",
                },
                {
                    anchor: t("footer.returns"),
                    path: "assistenza/resi",
                },
            ]
        }
    ]

    const navigate = useNavigate();

    function mapFooterMenu(item, key) {
        return <div key={`${key}-${Math.random()}`} className='footer__top__list'>
            <header>
                {item.header}
            </header>
            <ul>
                {item.list.map(mapSubFooterMenu)}
            </ul>
        </div>;

    }

    function mapSubFooterMenu(item, key) {
        return <li key={`${key}-${Math.random()}`}>
            <a onClick={goTo(item.path)}>{item.anchor}</a>
        </li>
    }

    const goTo = (path) => () => {
        navigate(path)
    }


    return (
        <footer id='footer'>
            <div className='footer__top'>
                <nav>
                    {menu.map(mapFooterMenu)}
                </nav>
                <div className='footer__top__socials'>
                    <a className='footer__top__socials__facebook' href='#'>
                        <FacebookIcon fontSize={'inherit'} />
                    </a>
                    <a className='footer__top__socials__instagram' href='#'>
                        <InstagramIcon fontSize={'inherit'} />
                    </a>
                    <a className='footer__top__socials__youtube' href='#'>
                        <YouTubeIcon fontSize={'inherit'} />
                    </a>
                </div>
            </div>
            <div className='footer__bottom'>
                <SwitchLanguage />
                <small>
                    &copy; 2023 Nome Sito SRL. P.IVA. 05593460162. Le foto dei prodotti presenti sul sito sono puramente esemplificative.
                </small>
            </div>
        </footer>
    )
}

export default Footer;