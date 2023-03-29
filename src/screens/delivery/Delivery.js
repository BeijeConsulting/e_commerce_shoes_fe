import React from 'react';
import PropTypes from 'prop-types';
import "./delivery.scss"
import Seo from '../../components/functionalComponents/Seo';


function Delivery() {
    return (
        <div className='delivery'>
            <Seo
                title="Spedizioni"
                description="Gestione delle spedizioni"
                content="e-commerce"
            />
            <h1>Spedizioni</h1>
            <h3>Tempi e costi di spedizione</h3>
            <p>
                La spedizione è gratuita per la maggior parte degli articoli per ordini superiori a 28,90 €.
            </p>

            <p>
                Per quelli il cui importo è inferiore a 28,90 €, il costo di spedizione è di 4,95 €.
            </p>

            <p>
                Gli articoli da lunga distanza non rientrano questa offerta. Gli articoli devono essere spediti da un magazzino più lontano, perciò è previsto un costo di consegna da lunga distanza di 4,95 €.
            </p>

            <p>
                Se il valore dell'ordine è inferiore al valore minimo di 28,90 € e comprende anche un articolo per la consegna a distanza, si dovrà pagare solo la tariffa di consegna standard, non entrambe.
            </p>

            <p>
                In caso di reso o di annullamento dell'ordine, la tariffa di consegna standard e la tariffa di consegna da lunga distanza vengono rimborsate solo in caso di restituzione dell'intero ordine, non in caso di restituzione parziale.
            </p>
        </div>
    )
}

Delivery.defaultProps = {

}

Delivery.propTypes = {

}

export default Delivery;