import React from 'react';
import './header.scss';

// MUI TextField
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Header() {
    return (
        <header className='main-header'>
            <nav>
                <div className='main-header__top'>
                    <div className='main-header__top__left'>
                        <MenuIcon className='main-header__hamburger' fontSize={"large"} />
                        <img className='main-header__logo' src={require('../../../assets/images/logo/logo-312.png')} alt='logo' />
                    </div>
                    {/* <ul className='main-header__menu'>
                        <li>uomo</li>
                        <li>donna</li>
                        <li>unisex</li>
                        <li>brand</li>
                        <li>offerte</li>
                        <li>nuovi arrivi</li>
                    </ul>
                    <div className='main-header__top__input'>
                        <TextField
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize={"large"} />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </div>
                    */}
                    <ShoppingCartIcon fontSize={"large"} />
                </div>
                <div className='main-header__bottom'>
                    <TextField
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize={"large"} />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                </div>
                <div className='main-header__mobile-menu'>
                    <ul>
                        <li>
                            <div className='mobile-menu__item active'>
                                <div>uomo</div>
                                <ArrowForwardIosIcon />
                            </div>
                        </li>
                    </ul>
                    <div className='mobile-menu__bottom'>
                        <button>ACCEDI</button>
                        <p>Non hai un account? REGISTRATI QUI</p>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;