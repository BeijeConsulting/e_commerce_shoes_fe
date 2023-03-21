import React, { useState } from "react";
import './filterMenu.scss';

import Slider from '@mui/material/Slider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function FilterMenu() {
    const minMax = [20, 1000];

    const [state, setState] = useState({
        active: [],
        filters: {
            price: [20, 1000],
            onSale: false,
            genre: '',
            size: '',
        }
    });

    console.log(state.filters)

    function handleActive(event) {
        const toActive = event.target.getAttribute('data-filter');
        let active = [];

        if (!state.active.includes(toActive)) {
            active.push(toActive);
        }

        setState(
            {
                ...state,
                active,
            }
        )
    }

    function handlePriceChange(event, value) {
        setState({
            ...state,
            filters: {
                ...state.filters,
                price: value,
            }
        });
    };

    function handleSaleChange() {
        setState({
            ...state,
            filters: {
                ...state.filters,
                onSale: !state.filters.onSale,
            }
        });
    };

    function handleGenreChange(e) {
        let choice = e.target.value;
        if (state.filters.genre === choice) choice = '';
        setState({
            ...state,
            filters: {
                ...state.filters,
                genre: choice,
            }
        });
    };

    function handleSizeChange(e) {
        let choice = e.target.value;
        if (state.filters.size === choice) choice = '';
        setState({
            ...state,
            filters: {
                ...state.filters,
                size: choice,
            }
        });
    };

    return (
        <aside className="filter-menu">
            <div className="filter-menu__items">
                <div className={`item ${state.active.includes("price") ? 'active' : ''}`}>
                    <header onClick={handleActive} data-filter="price" className={`${state.filters.price[0] !== minMax[0] || state.filters.price[1] !== minMax[1] ? 'checked' : ''}`} >
                        <div>prezzo</div>
                        {!state.active.includes("price") && <KeyboardArrowDownIcon fontSize={'large'} />}
                        {!!state.active.includes("price") && <KeyboardArrowUpIcon fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <div className="label">
                                <div className="price-range">
                                    <div>{state.filters.price[0]}€</div>
                                    <div>{state.filters.price[1]}€</div>
                                </div>
                                <Slider
                                    className="mui-slider-modifier"
                                    value={state.filters.price}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay="auto"
                                    min={minMax[0]}
                                    max={minMax[1]}
                                    color="primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`item ${state.active.includes("on-sale") ? 'active' : ''}`}>
                    <header onClick={handleActive} data-filter="on-sale" className={`${!!state.filters.onSale ? 'checked' : ''}`} >
                        <div>Ribassi</div>
                        {!state.active.includes("on-sale") && <KeyboardArrowDownIcon fontSize={'large'} />}
                        {!!state.active.includes("on-sale") && <KeyboardArrowUpIcon fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <input onClick={handleSaleChange} type={'checkbox'} id="on-sale1" />
                            <label className="label" htmlFor="on-sale1">scarpe in ribasso</label>
                        </div>
                    </div>
                </div>

                <div className={`item ${state.active.includes("genre") ? 'active' : ''}`}>
                    <header onClick={handleActive} data-filter="genre" className={`${state.filters.genre ? 'checked' : ''}`} >
                        <div>Genere</div>
                        {!state.active.includes("genre") && <KeyboardArrowDownIcon fontSize={'large'} />}
                        {!!state.active.includes("genre") && <KeyboardArrowUpIcon fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <input type={'checkbox'} id="genre1" value={'m'} onChange={handleGenreChange} checked={state.filters.genre === 'm' ? true : false} />
                            <label className="label" htmlFor="genre1">uomo</label>
                        </div>
                        <div className="item">
                            <input type={'checkbox'} id="genre2" value={'f'} onChange={handleGenreChange} checked={state.filters.genre === 'f' ? true : false} />
                            <label className="label" htmlFor="genre2">donna</label>
                        </div>
                        <div className="item">
                            <input type={'checkbox'} id="genre3" value={'u'} onChange={handleGenreChange} checked={state.filters.genre === 'u' ? true : false} />
                            <label className="label" htmlFor="genre3">unisex</label>
                        </div>
                    </div>
                </div>

                <div className={`item ${state.active.includes("size") ? 'active' : ''}`}>
                    <header onClick={handleActive} data-filter="size" className={`${state.filters.size ? 'checked' : ''}`} >
                        <div>taglia</div>
                        {!state.active.includes("size") && <KeyboardArrowDownIcon fontSize={'large'} />}
                        {!!state.active.includes("size") && <KeyboardArrowUpIcon fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <input type={'checkbox'} id="size1" value={'eu 38'} onChange={handleSizeChange} checked={state.filters.size === 'eu 38' ? true : false} />
                            <label className="label" htmlFor="size1">eu 38</label>
                        </div>
                        <div className="item">
                            <input type={'checkbox'} id="size2" value={'eu 39'} onChange={handleSizeChange} checked={state.filters.size === 'eu 39' ? true : false} />
                            <label className="label" htmlFor="size2">eu 39</label>
                        </div>
                        <div className="item">
                            <input type={'checkbox'} id="size3" value={'eu 40'} onChange={handleSizeChange} checked={state.filters.size === 'eu 40' ? true : false} />
                            <label className="label" htmlFor="size3">eu 40</label>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    )
}

export default FilterMenu;