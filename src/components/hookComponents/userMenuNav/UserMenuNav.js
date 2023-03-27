import React, { useState } from 'react';

import { AccountCircle, Logout } from '@mui/icons-material';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';

import { setUserCredentials } from '../../../redux/ducks/userDuck';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearLocalStorage, getLocalStorage } from '../../../utils/localStorageUtils';
import "./userMenuNav.scss"
import { getUser, signout } from '../../../services/authServices';

function UserMenuNav(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
            navigate("/user-info");
        } else {
            navigate("/identity");
        }

        handleClose()
    }

    function goToRegistartion() {
        navigate("/identity/signup")
    }

    function userLogOut() {
        const token = getLocalStorage("token");
        const refreshToken = getLocalStorage("refreshToken");


        //    const response = await signout(refreshToken)
        //     console.log("responeToken", response);

        dispatch(
            setUserCredentials(
                {
                    isLogged: false,
                }
            ))

        clearLocalStorage()
        navigate("/")
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
                                    Mio Profilo
                                </span>
                            </p> :
                            <p onClick={ conditionalGoTo }
                                className='item'>
                                Accedi</p> }
                    </MenuItem>
                    <MenuItem onClick={ conditionalGoTo }>
                        {
                            <p
                                className='item'>
                                WishList
                            </p>
                        }
                    </MenuItem>
                    <MenuItem onClick={ conditionalGoTo }>
                        {
                            <p
                                className='item'>
                                Ordini
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

export default UserMenuNav