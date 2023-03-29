import React from 'react'
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet'
import i18n from '../../assets/translations/i18n';

function Seo(props) {
    const lang = i18n.language.slice(0, 2)
    return (
        <>
            <Helmet>
                { /* Standard metadata tags */ }
                <html lang={ lang } />
                <title>{ props.title }</title>
                <meta name='description' content={ props.description } />
                { /* End standard metadata tags */ }

                { /* Facebook tags */ }
                <meta property="og:type" content={ props.type } />
                <meta property="og:site_name" content={ props.siteName } />
                <meta property="og:title" content={ props.title } />
                <meta property="og:description" content={ props.description } />
                <meta property="og:local" content={ props.lang } />
                <meta property="og:image" content={ props.image } />
                <meta property="og:image:alt" content={ props.altImg } />
                { /* End Facebook tags */ }

                { /* Twitter tags */ }
                <meta name="twitter:creator" content={ props.name } />
                <meta name="twitter:card" content={ props.type } />
                <meta name="twitter:title" content={ props.title } />
                <meta name="twitter:description" content={ props.description } />
                <meta property="twitter:image" content={ props.image } />
                <meta property="twitter:image:alt" content={ props.altImg } />
                { /* End Twitter tags */ }
            </Helmet>
        </>
    )
}

Seo.defaultProps = {
    lang: "it",
    title: "e-commerce",
    description: "e-commerce di scarpe",
    content: "",
    image: "",
    altImg: ""
}

Seo.propTypes = {
    lang: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    altImg: PropTypes.string,
    image: PropTypes.string,
}

export default Seo