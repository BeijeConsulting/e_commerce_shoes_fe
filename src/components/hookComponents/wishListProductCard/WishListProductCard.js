import React from 'react';
import PropTypes from 'prop-types';
import "./wishListProductCard.scss";
import nikeWhite from "../../../assets/images/wishListCard/nike-white.webp";
import { ImCancelCircle } from "react-icons/im"


function WishListProductCard(props) {

    //inserire funzione per eliminare item dalla wishlist
    //inserire funzione useNavigate per andare alla pagina del prodotto sigolo

    return (
        <article className='card'>
            <div className='card__container'>
                <img src={ nikeWhite } alt="nike white" />

                <div className='card__absolute'>

                    <div className='card__header'>
                        <div className='card__wrapper'>

                            <div className='card__price'>
                                <p className='card__sellingPrice'>119.00$</p>
                                {/* { props.initialPrice && <p className='card__initialPrice'>149.99$</p>
                    } */}
                                <p className='card__initialPrice'>149.99$</p>
                            </div>
                            <span>
                                <ImCancelCircle />
                            </span>
                        </div>

                    </div>

                    <div className='card__info'>
                        <h2>Nike - Air Max 270 - Sneakers bianche AH8050-100</h2>

                        <div className='card__info--detail'>
                            <p>Bianco</p>
                            <p>UE 39</p>
                        </div>
                    </div>
                </div>

            </div>
        </article>
    )
}

WishListProductCard.defaultProps = {

}

WishListProductCard.propTypes = {

}

export default WishListProductCard