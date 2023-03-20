import React, { useState, useEffect } from 'react';
import './header.scss';

// MUI TextField
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ClearIcon from '@mui/icons-material/Clear';

function Header() {
    const menu = [
        {
            top: {
                anchor: 'uomo',
            },
            bottom: [
                {
                    anchor: 'sportive',
                },
                {
                    anchor: 'eleganti',
                },
                {
                    anchor: 'casual',
                },
            ]
        },
        {
            top: {
                anchor: 'donna',
            },
            bottom: [
                {
                    anchor: 'sportive',
                },
                {
                    anchor: 'eleganti',
                },
                {
                    anchor: 'casual',
                },
            ]
        },
        {
            top: {
                anchor: 'unisex',
            },
            bottom: [
                {
                    anchor: 'sportive',
                },
                {
                    anchor: 'eleganti',
                },
                {
                    anchor: 'casual',
                },
            ]
        },
        {
            top: {
                anchor: 'brand',
            },
        },
        {
            top: {
                anchor: 'offerte',
            },
        },
        {
            top: {
                anchor: 'nuovi arrivi',
            },
        },
    ]

    let menuInterval = null;

    const [state, setState] = useState(
        {
            showMobileMenu: false,
            right: 100,
            active: null,
            fullWidthInput: false,
        }
    )

    useEffect(() => {
        menuInterval = setInterval(() => {
            let right = null;
            if (state.right === 0) return;
            if (state.right === 100 && !state.showMobileMenu) return;
            right = state.right - 10;
            setState(
                {
                    ...state,
                    right: right,
                }
            )
        }, 1)

        return () => clearInterval(menuInterval);
    }, [state.showMobileMenu, state.right])

    function setActive(key) {
        let menuIndex = state.active === null ? key : null;
        setState(
            {
                ...state,
                active: menuIndex,
            }
        )
    }

    function toggleMobileMenu() {
        let right = 100;
        if (!!state.showMobileMenu) right = 0;
        setState(
            {
                ...state,
                showMobileMenu: !state.showMobileMenu,
                active: null,
                right,
            }
        )
    }

    function toggleInput() {
        setState(
            {
                ...state,
                fullWidthInput: !state.fullWidthInput,
            }
        )
    }

    function goTo(path) {
        console.log(path);
    }

    function mapMobileMenu(item, key) {
        let showItem = false;
        if (state.active === key || state.active === null) showItem = true;
        return <li key={`${key}-${Math.random()}`}>
            {!!showItem &&
                <>
                    <div onClick={item.bottom ? () => setActive(key) : () => goTo('path')} className={`mobile-menu__item ${state.active === key ? 'active' : ''}`}>
                        <div>{item.top.anchor}</div>
                        {state.active === null && <ArrowForwardIosIcon />}
                        {state.active === key && <KeyboardBackspaceIcon fontSize={"large"} />}
                    </div>
                    {state.active === key && item.bottom &&
                        <ul>
                            {item.bottom.map(mapSubMenu)}
                        </ul>
                    }
                </>
            }
        </li>
    }

    function mapSubMenu(item, key) {
        return <li key={`${key}-${Math.random()}`} className='mobile-menu__item'>
            <div>{item.anchor}</div>
            <ArrowForwardIosIcon />
        </li>
    }

    return (
        <header className='main-header'>
            <nav>
                <div className='main-header__top'>
                    <div className='main-header__top__left'>
                        {!state.showMobileMenu && <MenuIcon onClick={toggleMobileMenu} className='main-header__hamburger' fontSize={"large"} />}
                        {!!state.showMobileMenu && <ClearIcon onClick={toggleMobileMenu} className='main-header__hamburger' fontSize={"large"} />}
                        <img className='main-header__logo' src={require('../../../assets/images/logo/logo-312.png')} alt='logo' />
                    </div>
                    <ul className={'main-header__menu'}>
                        <li>
                            <div>uomo</div>
                            <div className='main-header__menu__sub'>
                                <ul>
                                    <li>sportive</li>
                                    <li>eleganti</li>
                                    <li>casual</li>
                                </ul>
                            </div>
                        </li>
                        <li>donna</li>
                        <li>unisex</li>
                        <li>brand</li>
                        <li>offerte</li>
                        <li>nuovi arrivi</li>
                    </ul>
                    <div className='main-header__top__input' style={{ width: !!state.fullWidthInput ? '70rem' : '20rem' }}>
                        <TextField
                            onBlur={toggleInput}
                            onFocus={toggleInput}
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
                {!!state.showMobileMenu &&
                    <div className='main-header__mobile-menu' style={{ right: `${state.right}%` }}>
                        <ul>
                            {menu.map(mapMobileMenu)}
                        </ul>
                        <div className='mobile-menu__bottom'>
                            <button>ACCEDI</button>
                            <p className='register-text'>Non hai un account? REGISTRATI QUI</p>
                        </div>
                    </div>
                }
            </nav>
        </header>
    )
}

export default Header;