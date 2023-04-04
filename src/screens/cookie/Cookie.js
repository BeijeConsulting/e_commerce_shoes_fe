import React from "react";

import { useTranslation } from 'react-i18next';

function Cookie() {
    const { t } = useTranslation()

    return (
        <>
            <h1>{ t("cookie.h1") }</h1>
            <p>{ t("cookie.p1") }</p>
            <h2>{ t("cookie.h2") }</h2>
            <p>{ t("cookie.p2") }</p>
            <h2>{ t("cookie.h2-2") }</h2>
            <p>{ t("cookie.p3") }</p>
            <ul>
                <li>{ t("cookie.li1") }</li>
                <li>{ t("cookie.li2") }</li>
                <li>{ t("cookie.li3") }</li>
                <li>{ t("cookie.li4") }</li>
                <li>{ t("cookie.li5") }</li>
                <li>{ t("cookie.li6") }</li>
            </ul>
            <h2>
                { t("cookie.h2-3") }</h2>
            <h3>{ t("cookie.h3") }</h3>
            <p>{ t("cookie.p4") }</p>

            <h3>{ t("cookie.h3-2") }</h3>
            <p>{ t("cookie.p5") }</p>
        </>
    )
}

export default Cookie;