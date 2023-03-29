import React, { useState } from 'react';
import PropTypes from 'prop-types';


// Redux
import { useDispatch, useSelector } from 'react-redux';
import { removeUserCredentials, setUserCredentials } from '../../../redux/ducks/userDuck';
// Router
import { useNavigate } from 'react-router-dom';
// Utils
import { clearLocalStorage } from '../../../utils/localStorageUtils';
// API
import { signOut } from '../../../services/authServices';
// MUI
import { AccountCircle, Logout } from '@mui/icons-material';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
// SCSS
import "./userMenuNav.scss";
import i18n from '../../../assets/translations/i18n';
import { useTranslation } from 'react-i18next';
import { removeToken } from '../../../redux/ducks/tokenDuck';

function UserMenuNav(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const token = useSelector((state) => state.tokenDuck.token)
    const refreshToken = useSelector((state) => state.tokenDuck.refreshToken)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const lang = i18n.language.slice(0, 2)
    const { t } = useTranslation();


    function handleClose() {
        setAnchorEl(null);
    };

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    };

    const userIsLogged = useSelector((state) => state.userDuck.isLogged);

    // if user is logged --> screen userInfo
    // if user is not logged --> screen identity
    function conditionalGoTo() {
        console.log("islogged", userIsLogged);
        if (userIsLogged) {
            navigate("user-info");
        } else {
            navigate("/identity");
        }

        handleClose()
    }

    function conditionalGoToCart() {
        console.log("islogged", userIsLogged);
        if (userIsLogged) {
            navigate("user-info/order-list");
        } else {
            navigate("/identity");
        }

        handleClose()
    }

    function goToRegistartion() {
        navigate("/identity/signup")
    }

    async function userLogOut() {
        const response = await signOut(refreshToken, token)
        console.log("responeToken", response);

        dispatch(
            removeUserCredentials()
        )


        dispatch(
            removeToken()
        )





        clearLocalStorage()
        navigate(`/${lang}/`)
    }

    function goToOrders() {
        navigate("user-info/order-list")
    }



    return (
        <div className='userMenuNav'>
            <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={ handleMenu }
                    color="inherit"
                >

                    <AccountCircle fontSize='large' />
                </IconButton>
                <Menu
                    className='myMenu'
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
                    <MenuItem onClick={ conditionalGoTo } >
                        <Avatar sx={ { marginRight: 2 } } />
                        { userIsLogged ?
                            <p onClick={ conditionalGoTo } className='item'>
                                <span>
                                    { t("userMenuNav.profile") }
                                </span>
                            </p> :
                            <p onClick={ conditionalGoTo }
                                className='item'>
                                { t("userMenuNav.logIn") }</p> }
                    </MenuItem>
                    <MenuItem onClick={ conditionalGoTo }>
                        {
                            <p
                                className='item'>
                                WishList
                            </p>
                        }
                    </MenuItem>
                    <MenuItem onClick={ conditionalGoToCart }>
                        {
                            <p
                                className='item'>
                                { t("userMenuNav.orders") }
                            </p>
                        }
                    </MenuItem>

                    <Divider />


                    <MenuItem onClick={ handleClose }>
                        <ListItemIcon>
                            <Logout className='logOut' />
                        </ListItemIcon>
                        { userIsLogged ?
                            <p onClick={ userLogOut }
                                className='logOut__p'>
                                Logout
                            </p> :
                            <p
                                onClick={ goToRegistartion }
                                className='logOut__p'>
                                Registrati
                            </p>
                        }
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

UserMenuNav.defaultProps = {

}

UserMenuNav.propTypes = {

}

export default UserMenuNav;