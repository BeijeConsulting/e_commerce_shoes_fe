import React from "react";
import { useTranslation } from 'react-i18next';

function Terms() {
    const { t } = useTranslation()
    return (
        <>
            <h1>{ t("termAndConditions.h1") }</h1>
            <p>
                { t("termAndConditions.p1") }
            </p>

            <p>
                { t("termAndConditions.p2") }
            </p>

            <p>
                { t("termAndConditions.p3") }
            </p>

            <p>
                { t("termAndConditions.p4") }
            </p>

            <p>
                { t("termAndConditions.p5") }
            </p>

        </>
    )
}

export default Terms;