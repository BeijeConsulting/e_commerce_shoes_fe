import React from 'react';
import './footer.scss';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import { useNavigate } from 'react-router-dom';

function Footer() {
    const menu = [
        {
            header: 'Nome Sito',
            list: [
                {
                    anchor: 'Chi siamo',
                    path: '/customer-care/about-us',
                },
                {
                    anchor: 'Login',
                    path: '/identity/',
                },
                {
                    anchor: 'Registrati',
                    path: '/identity/signup',
                },
            ]
        },
        {
            header: 'Privacy e Cookie',
            list: [
                {
                    anchor: 'Privacy policy',
                    path: '/customer-care/privacy',
                },
                {
                    anchor: 'Cookie policy',
                    path: '/customer-care/cookie',
                },
            ]
        },
        {
            header: 'Contatti',
            list: [
                {
                    anchor: 'Servizio clienti',
                    path: '/customer-care',
                },
                {
                    anchor: 'FAQ',
                    path: '/customer-care/faq',
                },
                {
                    anchor: 'Termini e condizioni',
                    path: '/customer-care/terms-and-condictions',
                },
                {
                    anchor: 'Resi',
                    path: '/customer-care/returns',
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
                <small>
                    &copy; 2023 Nome Sito SRL. P.IVA. 05593460162. Le foto dei prodotti presenti sul sito sono puramente esemplificative.
                </small>
            </div>
        </footer>
    )
}

export default Footer;