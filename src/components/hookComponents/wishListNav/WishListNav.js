import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// MUI
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Badge } from '@mui/material';
// Redux
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// SCSS
import "./wishListNav.scss"

function WishListNav(props) {

    const wishListitemQuantity = useSelector((state) => state.userDuck.wishlistItems)


    console.log("wishListitemQuantity", wishListitemQuantity)

    return (
        <Link to={ "lista-desideri" }>
            <div className='icon__container'>
                <Badge
                    badgeContent={ `${wishListitemQuantity} ` }
                    color="primary"
                >
                    <FavoriteIcon color="action" className='icon' />
                </Badge>
            </div>
        </Link>
    )
}

WishListNav.defaultProps = {

}

WishListNav.propTypes = {

}


export default WishListNav