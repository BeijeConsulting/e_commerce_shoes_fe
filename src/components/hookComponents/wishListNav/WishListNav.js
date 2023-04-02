import React from 'react';
import PropTypes from 'prop-types';

// MUI
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Badge } from '@mui/material';

// SCSS
import "./wishListNav.scss"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function WishListNav(props) {

    const wishListitemQuantity = useSelector((state) => state.userDuck.wishlistItems)

    return (
        <Link to={ "wishlist" }>
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