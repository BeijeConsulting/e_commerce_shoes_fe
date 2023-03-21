import React from 'react';
import './footer.scss';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
    return (
        <footer id='footer'>
            <div className='footer__top'>
                <nav>
                    <div className='footer__top__list'>
                        <header>
                            Nome Sito
                        </header>
                        <ul>
                            <li>
                                <a href='#'>Chi siamo</a>
                            </li>
                            <li>
                                <a href='#'>Login</a>
                            </li>
                            <li>
                                <a href='#'>Registrati</a>
                            </li>
                        </ul>
                    </div>
                    <div className='footer__top__list'>
                        <header>
                            Privacy e Cookie
                        </header>
                        <ul>
                            <li>
                                <a href='#'>Privacy Policy</a>
                            </li>
                            <li>
                                <a href='#'>Cookie Policy</a>
                            </li>
                            <li>
                                <a href='#'>Preferenze cookie</a>
                            </li>
                        </ul>
                    </div>
                    <div className='footer__top__list'>
                        <header>
                            Contatti
                        </header>
                        <ul>
                            <li>
                                <a href='#'>Servizio Clienti</a>
                            </li>
                            <li>
                                <a href='#'>FAQ</a>
                            </li>
                            <li>
                                <a href='#'>Termini e Condizioni</a>
                            </li>
                            <li>
                                <a href='#'>Resi</a>
                            </li>
                        </ul>
                    </div>
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
                    Nome Sito SRL, P.IVA. 05593460162. Le foto dei prodotti presenti sul sito sono puramente esemplificative. &copy; 2023 Nome Sito
                </small>
            </div>
        </footer>
    )
}

export default Footer;