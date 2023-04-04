import React from 'react';

// Router
import { Link } from 'react-router-dom';
// Component
import Seo from '../../components/functionalComponents/Seo';
// Libraries
import { Player, Controls } from '@lottiefiles/react-lottie-player';
// i18n
import { useTranslation } from 'react-i18next';
// SCSS
import "./errorPage.scss"

function ErrorPage() {

    const { t } = useTranslation()

    return (
        <>
            <Seo
                title="Page not Found (404)"
                description="La pagina non esiste..."
                content="e-commerce"
            />
            <Player
                autoplay
                loop
                src="https://assets10.lottiefiles.com/packages/lf20_8ZNTHtjth6.json"
                style={ { height: '300px', width: '300px' } }
            >
                {/* <Controls visible={ true } buttons={ ['play', 'repeat', 'frame', 'debug'] } /> */ }
            </Player>
            <div className='error'>
                <h1>{ t("errorPage.h1") }</h1>
                <h3>{ t("errorPage.h3") }</h3>
                <h4>{ t("errorPage.h4") }</h4>
                <p>
                    { t("errorPage.p1") }

                    <Link to={ "" } className='link'>Home</Link>

                    { t("errorPage.p2") }
                </p>
            </div>


        </>
    )
}

export default ErrorPage