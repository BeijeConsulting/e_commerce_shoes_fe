import React from 'react';
import PropTypes from 'prop-types';

import "./faq.scss";

// MUI component
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function Faq(props) {

    const dataFaq = [
        {
            title: "Rimborso",
            answer: "Se hai effettuato un reso il rimborso avverrà entro 14 giorni dalla data di consegna del pacco al corriere.Non appena il reso sarà ricevuto e controllato ti invieremo un'email di conferma. Nel caso tu abbia pagato le spese per la spedizione standard e decida di rendere l'ordine per intero, queste ti verranno rimborsate.",
            id: 1
        },
        {
            title: "Metodi di pagamento",
            answer: "È possibile pagare gli ordini con carta di credito, Postepay, Paypal, in contanti alla consegna oppure con il tuo credito.",
            id: 2
        },
        {
            title: "PayPal",
            answer: "Se scegli di pagare con questo metodo sarai diretto al sito di PayPal.Se hai già un conto PayPal, identificati con il tuo indirizzo email e password e conferma il pagamento.Se non hai un conto PayPal, puoi procedere con un conto ospite o crearne uno.Il pagamento sarà registrato entro pochi minuti e il tuo ordine sarà immediatamente processato.Prima di procedere al pagamento ti verrà richiesto di accettare la sezione Termini e condizioni di PayPal.",
            id: 3
        },
        {
            title: "Resi e Rimborsi",
            answer: "Puoi effettuare il reso gratuito dei tuoi ordini entro 100 giorni. Potrai prenotare il ritiro direttamente a casa tua oppure consegnarlo in uno dei 12.000 uffici postali abilitati. Potrai anche utilizzare la rete Punto Poste, composta da 10.000 tabaccherie o negozi convenzionati e da 350 locker distribuiti su tutto il territorio nazionale.",
            id: 3
        },
    ]

    function mapList(data, i) {
        return (
            <div className='accordion' key={ i }>
                <Accordion sx={ { boxShadow: "none" } }>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon /> }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='accordion__summary'
                    >
                        <h2 className='accordion__title'>{ data.title }</h2>
                    </AccordionSummary>
                    <AccordionDetails className='accordion__details'>
                        <p className='accordion__answer'>
                            { data.answer }
                        </p>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }


    return (
        <>
            { dataFaq.map(mapList) }
        </>
    )
}


Faq.defaultProps = {

}

Faq.propTypes = {

}

export default Faq