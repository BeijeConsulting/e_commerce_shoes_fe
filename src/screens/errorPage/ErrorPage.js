import React from 'react';

// Router
import { Link } from 'react-router-dom';
// Component
import Seo from '../../components/functionalComponents/Seo';
// Libraries
import { Player, Controls } from '@lottiefiles/react-lottie-player';

// SCSS
import "./errorPage.scss"

function ErrorPage() {
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
                <h1>Abbiamo identificato un problema...</h1>
                <h3>La pagina non esiste. Prova a pulire la cronologia del tuo browser e premi aggiorna.</h3>
                <h4>Nessun risultato?</h4>
                <p>
                    Clicca su

                    <Link to={ "" } className='link'>Home</Link>

                    per tornare alla homepage.
                </p>
            </div>


        </>
    )
}

export default ErrorPage