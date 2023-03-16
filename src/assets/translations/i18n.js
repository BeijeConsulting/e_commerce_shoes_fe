import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import englishLanguage from "./en.json";
import italianLanguage from "./it.json";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: englishLanguage,
      it: italianLanguage,
    },
  });

console.log(i18n);

export default i18n;

// PER CAMBIARE LINGUA:

// HOOK:
// const { t } = useTranslation();
// onClick={() => i18n.changeLanguage(lng)}

// CLASS:
// i18n.changeLanguage("en");

// import React from "react";
// import { useTranslation } from "react-i18next";

// HOOK COMPONENT
// function LanguageTestHook() {
//  const { t } = useTranslation();
//  return (
//    <div>
//      <p>{t("greeting")}</p>
//    </div>
//  );
// }
// export default LanguageTestHook;

// CLASS
// Importare i18next: import i18next from "i18next";
// Importare il nostro file i18n (percorso esemplificativo):
// import i18n from "../assets/translations/i18n";

// Per tradurre del testo fare così:
// <p>{i18next.t("greeting")}</p>

//EXEMPLE:
// import Seo from "../../components/functionalComponents/Seo";
// import "./cms.scss";
// import { useTranslation } from "react-i18next";
// import i18n from "../../assets/translations/i18n";

// function Cms() {
//   const { t } = useTranslation();
//   return (
//     <div>
//       <Seo
//         lang="it"
//         title="Pagina principale"
//         description="Descrizione pagina principale"
//         content="e-commerce"
//       />

//       <h1>{t("greeting")}</h1>

//       <button
//         onClick={() => {
//           return i18n.changeLanguage("it");
//         }}
//       >
//         i18n
//       </button>
//     </div>
//   );
// }
