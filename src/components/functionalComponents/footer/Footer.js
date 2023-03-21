import React from 'react';
import './footer.scss';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
    const menu = [
        {
            header: 'Nome Sito',
            list: [
                {
                    anchor: 'Chi siamo',
                    path: '/',
                },
                {
                    anchor: 'Login',
                    path: '/',
                },
                {
                    anchor: 'Registrati',
                    path: '/',
                },
            ]
        },
        {
            header: 'Privacy e Cookie',
            list: [
                {
                    anchor: 'Privacy policy',
                    path: '/',
                },
                {
                    anchor: 'Cookie policy',
                    path: '/',
                },
                {
                    anchor: 'Preferenze cookie',
                    path: '/',
                },
            ]
        },
        {
            header: 'Contatti',
            list: [
                {
                    anchor: 'Servizio clienti',
                    path: '/',
                },
                {
                    anchor: 'FAQ',
                    path: '/',
                },
                {
                    anchor: 'Termini e condizioni',
                    path: '/',
                },
                {
                    anchor: 'Resi',
                    path: '/',
                },
            ]
        }
    ]

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
            <a href='#'>{item.anchor}</a>
        </li>
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