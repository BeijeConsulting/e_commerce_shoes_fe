import React from "react";
import PropTypes from "prop-types";
import "./orderListAccordion.scss";
import shoe1 from "../../../assets/images/productCardImg.jpg";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function OrderListAccordion(props) {
  function renderProductList(product, key) {
    return (
      <li className="accordion__list" key={key}>
        <div className="accordion__details">
          <img src={product.image} alt="product" />
          <h3>{product.name}</h3>
        </div>
        <div className="accordion__details">
          <p>{product.brand}</p>
        </div>

        {/* <div className="accordion__details">
          <p>Quantitá: {product.quantity}</p>
        </div> */}

        <div className="accordion__details--price">
          <p>$ {Number(product.paidItemTotalPrice).toFixed(2)}</p>
        </div>
      </li>
    );
  }

  return (
    <div className="container__accordion">
      <Accordion className="accordion" sx={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="accordion__summary"
        >
          <div className="accordion__summary--wrapper">
            <div className="accordion__info">
              <h3>ORDINE: </h3>
              <p>{props.orderId} </p>
            </div>
            <div className="accordion__info">
              <h3>Intestatario: </h3>
              <p>
                {props.recipient.firstName} {props.recipient.lastName}{" "}
              </p>
            </div>
            <div className="accordion__info">
              <h3>Prodotti: </h3>
              <p>{props.totalQuantity} </p>
            </div>
            <div className="accordion__info">
              <h3>Totale: </h3>
              <p>$ {props.totalPrice} </p>
            </div>

            {/* <div className="accordion__info">
              <h3>Pagamento: </h3>
              <p>
                Paypal
                <span>PAGATO</span>
              </p>
            </div>
            <div className="accordion__info">
              <h3>Stato: </h3>
              <p>
                <span className="accordion__stato">CONSEGNATO</span>
              </p>
            </div> */}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ul>{props.products?.map(renderProductList)}</ul>
          {/* <div className="accordion__details">
            <img src={shoe1} alt="wine bottle" />
            <h3>Nike Air Zoom</h3>
          </div>

          <div className="accordion__details--price">
            <p>160,00$</p>
          </div> */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

OrderListAccordion.defaultProps = {};

OrderListAccordion.propTypes = {};

export default OrderListAccordion;
