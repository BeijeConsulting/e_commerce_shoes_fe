import React from "react";
// import PropTypes from 'prop-types';

// MUI component
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// i18n
import { useTranslation } from "react-i18next";
// Components
import Seo from "../../components/functionalComponents/Seo";
// SCSS
import "./faq.scss";

function Faq(props) {
  const { t } = useTranslation();

  const dataFaq = [
    {
      title: t("faq.refunds"),
      answer: t("faq.a1"),
      id: 1,
    },
    {
      title: t("faq.payment"),
      answer: t("faq.a2"),
      id: 2,
    },
    {
      title: t("faq.payPal"),
      answer: t("faq.a3"),
      id: 3,
    },
    {
      title: t("faq.returnsAndRefunds"),
      answer: t("faq.a4"),
      id: 3,
    },
  ];

  function mapList(data, i) {
    return (
      <div className="accordion" key={i}>
        <Seo title="FAQ" description="Faq" content="e-commerce" />
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="accordion__summary"
          >
            <h2 className="accordion__title">{data.title}</h2>
          </AccordionSummary>
          <AccordionDetails className="accordion__details">
            <p className="accordion__answer">{data.answer}</p>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }

  return <>{dataFaq.map(mapList)}</>;
}

export default Faq;
