import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Redux
import { useSelector } from 'react-redux';
// Router
import { useNavigate } from 'react-router-dom';
// Component
import Button from "../../functionalComponents/button/Button"
// MUI
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Divider, IconButton, Menu, MenuItem } from '@mui/material';
// Images
import shoe from "../../../assets/images/singleProduct/shoe1.jpeg"
//SCSS
import "./cartNavMenu.scss"
import { useTranslation } from 'react-i18next';

function CartNavMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const { t } = useTranslation()

    const navigate = useNavigate()

    function handleClose() {
        setAnchorEl(null);
    };

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    };

    const cartQuantity = useSelector((state) => state.userDuck.cartItems);

    function goToCart() {
        navigate("/cart")
    }

    const dataProducts = [
        {
            name: "Nike Air Zoom",
            brand: "Nike",
            listedPrice: 199.00,
            sellingPrice: 40.00,
            productSize: "M41",
            quantity: 1
        },
        {
            name: "Nike Air Zoom",
            brand: "Nike",
            listedPrice: 199.00,
            sellingPrice: 40.00,
            productSize: "M41",
            quantity: 1,
        }
    ]

    function mapList(data, i) {
        return (
            <div key={ i }>
                <MenuItem
                >
                    <div className='cartNavMenu__menu'>
                        <div className="cartNavMenu__image">
                            <img src={ shoe } alt="" />
                        </div>
                        <div className="cartNavMenu__info">
                            <div className="cartNavMenu__info-name-price">
                                <h3>{ data.name }</h3>
                                <div className='container__price'>
                                    <p className="newPrice">
                                        { data.sellingPrice }$
                                    </p>
                                    <p className='oldPrice'>
                                        { data.listedPrice }$
                                    </p>
                                </div>
                            </div>
                            <p className='brand'>
                                { data.brand }
                            </p>
                            <div className='container__size-cartQuantity'>
                                <p className='infoSize'>
                                    { t("cartNavMenu.size") }: { data.productSize }
                                </p>
                                <p className='quantity'>
                                    { t("cartNavMenu.quantity") }: { data.quantity }
                                </p>
                            </div>
                        </div>
                    </div>
                </MenuItem>
            </div>
        )
    }


    return (
        <div className='cartMenuNav'>
            <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={ handleMenu }
                    color="inherit"
                >
                    <Badge badgeContent={ cartQuantity } color="primary">
                        <ShoppingCartIcon fontSize='large' />
                    </Badge>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={ anchorEl }
                    anchorOrigin={ {
                        vertical: 'center',
                        horizontal: 66,
                    } }
                    keepMounted
                    transformOrigin={ {
                        vertical: -30,
                        horizontal: "right",
                    } }
                    open={ Boolean(anchorEl) }
                    onClose={ handleClose }
                >

                    <MenuItem >
                        <h2>Carrello</h2>
                    </MenuItem>


                    {/* Qui bisogna fare il map di tutti i prodotti che l'utente aggiunge */ }
                    { dataProducts.map(mapList) }


                    <Divider />

                    <MenuItem
                        className='item'
                        onClick={ handleClose }>
                        <p>
                            Totale: 200.00
                        </p>
                    </MenuItem>
                    <MenuItem
                        className='item'
                        onClick={ handleClose }>
                        <div className='item__btn'>
                            <Button
                                buttonStyle={ "navCartBtn" }
                                label={ "CARRELLO" }
                                handleClick={ goToCart }
                            />
                        </div>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

CartNavMenu.defaultProps = {

}

CartNavMenu.propTypes = {

}

export default CartNavMenu;