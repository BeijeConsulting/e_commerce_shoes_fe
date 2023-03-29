import React from 'react';
import "./returnAndrefund.scss"
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Seo from '../../components/functionalComponents/Seo';


function ReturnAndRefund() {
    return (
        <div className='returns'>
            <Seo
                title="Resi e Rimborsi"
                description="Gestione dei resi e dei rimborsi"
                content="e-commerce"
            />
            <h1>Resi e Rimborsi</h1>
            <p>
                Se hai effettuato un reso il rimborso avverrà entro 14 giorni dalla data di consegna del pacco al corriere. Non appena il reso sarà ricevuto e controllato ti invieremo un'email di conferma. Nel caso tu abbia pagato le spese per la spedizione standard e decida di rendere l'ordine per intero, queste ti verranno rimborsate.
            </p>

            <h3>Hai pagato in contanti alla consegna?</h3>
            <p>
                Durante la procedura di reso online potrai scegliere il metodo di rimborso che preferisci, tra nota di credito (credito Zalando) o bonifico bancario.</p>
            <p>
                Nel caso in cui scegliessi il bonifico, sarà necessario inserire le tue coordinate bancarie (nome completo dell’intestatario del conto, IBAN e BIC).
            </p>

            <h3>Hai pagato con Paypal?</h3>
            <p>Riceverai la cifra relativa agli articoli resi sullo stesso account Paypal.</p>
        </div>
    )
}

ReturnAndRefund.defaultProps = {

}

ReturnAndRefund.propTypes = {

}

export default ReturnAndRefund;