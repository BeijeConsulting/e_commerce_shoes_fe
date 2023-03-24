import React from "react";
import "./cms.scss";
import Seo from "../../components/functionalComponents/Seo";
import Header from "../../components/hookComponents/header/Header";
import PreFooter from "../../components/hookComponents/preFooter/PreFooter";
import Footer from "../../components/functionalComponents/footer/Footer";

import { Outlet } from "react-router-dom";

function Cms() {
  return (
    <>
      <Seo
        lang="it"
        title="Pagina principale"
        description="Descrizione pagina principale"
        content="e-commerce"
      />

      <Header />

      <main>
        <Outlet />
        <PreFooter />
      </main>
      <Footer />
    </>
  );
}

export default Cms;
