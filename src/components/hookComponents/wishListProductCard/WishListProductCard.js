import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "./wishListProductCard.scss";
import nikeWhite from "../../../assets/images/wishListCard/nike-white.webp";
import { ImCancelCircle } from "react-icons/im"
import { deleteWishList, getWishList } from '../../../services/wishListServices';
import { Link, useNavigate } from 'react-router-dom';
import i18n from '../../../assets/translations/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { updateWishListQuantity } from '../../../redux/ducks/wishListDuck';


function WishListProductCard(props) {
    const lang = i18n.language.slice(0, 2)

    function deleteItem() {
        props.handleClick(props.deleteId)
    }

    return (

        <article className='card'>
            <Link to={ `/${lang}/product/${props.productId}` }>
                <div className='card__container'>

                    <img src={ nikeWhite } alt={ props.name } />

                    <div className='card__absolute'>

                        <div className='card__header'>
                            <div className='card__wrapper'>

                                <div className='card__price'>
                                    <p className='card__sellingPrice'>{ props.listedPrice }$</p>
                                    <p className='card__brand'>{ props.brand }</p>
                                </div>
                            </div>

                        </div>

                        <div className='card__info'>
                            <h2>{ props.name }</h2>

                            <div className='card__info--detail'>
                                <p>{ props.color }</p>
                                <p>{ props.size }</p>
                            </div>
                        </div>
                    </div>

                </div>
            </Link>


            <div className='card__icon'>
                <span onClick={ deleteItem }>
                    <ImCancelCircle />
                </span>
            </div>

        </article>

    )
}

WishListProductCard.defaultProps = {

}

WishListProductCard.propTypes = {

}

export default WishListProductCard