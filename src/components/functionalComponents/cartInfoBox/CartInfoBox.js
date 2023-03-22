import React from "react";
import './cartInfoBox.scss';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

function CartInfoBox() {
    return (
        <aside className="cart-info-box">
            <div className="__title">modalità di consegna</div>
            <div className="__shipping">
                <HomeRoundedIcon className="___home-icon-modifier" />
                <div>
                    Consegna a domicilio
                </div>
            </div>
            <div className="__title">modalità di pagamento</div>
            <img src={require("../../../assets/images/payments/metodi-pagamento.png")} />
        </aside>
    )
}

export default CartInfoBox;