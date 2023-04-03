import React from "react";

// MUI
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// i18n
import { useTranslation } from 'react-i18next';
//SCSS
import './cartInfoBox.scss';

function CartInfoBox() {
    const { t } = useTranslation()

    return (
        <aside className="cart-info-box">
            <div className="__title">
                { t("cartInfoBox.delivery") }
            </div>
            <div className="__shipping">
                <HomeRoundedIcon className="___home-icon-modifier" />
                <div>
                    { t("cartInfoBox.homeDelivery") }
                </div>
            </div>
            <div className="__title">
                { t("cartInfoBox.payMethod") }
            </div>
            <img src={ require("../../../assets/images/payments/metodi-pagamento.png") } />
        </aside>
    )
}

export default CartInfoBox;