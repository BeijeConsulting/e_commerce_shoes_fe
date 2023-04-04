import React from "react";
import { useTranslation } from 'react-i18next';

function Privacy() {
    const { t } = useTranslation()

    return (
        <>
            <h1>{ t("privacy.h1") }</h1>
            <p>{ t("privacy.p1") }</p>
            <ul>
                <li>{ t("privacy.li1") }</li>
                <li>{ t("privacy.li2") }</li>
                <li>{ t("privacy.li3") }</li>
                <li>{ t("privacy.li4") }</li>
                <li>{ t("privacy.li5") }</li>
                <li>{ t("privacy.li6") }</li>
            </ul>
            <p>{ t("privacy.p2") }</p>
            <ul>
                <li>{ t("privacy.li7") }</li>
                <li>{ t("privacy.li8") }</li>
            </ul>

        </>
    )
}

export default Privacy;