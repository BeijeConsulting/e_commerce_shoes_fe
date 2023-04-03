import React, { useEffect } from "react";
import "./cms.scss";
import Header from "../../components/hookComponents/header/Header";
import PreFooter from "../../components/hookComponents/preFooter/PreFooter";
import Footer from "../../components/functionalComponents/footer/Footer";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import i18n from "../../assets/translations/i18n";

function Cms() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // console.log("PATHNAME CMS", pathname)

  useEffect(() => {
    const langs = ["it", "en"];
    const isPathLang = langs.some((l) => pathname.includes(l));
    // console.log("isPathLang CMS", isPathLang)

    if (isPathLang) {
      navigate(`/${i18n.language.slice(0, 2)}/`);
    } else {
      navigate(`/${i18n.language.slice(0, 2)}/${pathname}`);
    }
  }, [pathname]);

  return (
    <div className="cms">
      <Header />

      <main>
        <Outlet />
        <PreFooter />
      </main>
      <Footer />
    </div>
  );
}

export default Cms;
