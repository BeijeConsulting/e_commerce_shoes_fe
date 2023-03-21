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

    return (
        <aside className="filter-menu">
            <div className="filter-menu__items">
                <div className={`item ${state.active.includes("price") ? 'active' : ''}`}>
                    <header onClick={handleActive} data-filter="price" >
                        <div>prezzo</div>
                        {!state.active.includes("price") && <KeyboardArrowDownIcon fontSize={'large'} />}
                        {!!state.active.includes("price") && <KeyboardArrowUpIcon fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <div className="price-range">
                                Gamma prezzi selezionata
                                <div>
                                    <div>{state.filters.price[0]}€</div>
                                    <div>&nbsp;-&nbsp;</div>
                                    <div>{state.filters.price[1]}€</div>
                                </div>
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
                <div className={`item ${state.active.includes("on-sale") ? 'active' : ''}`}>
                    <header onClick={handleActive} data-filter="on-sale" >
                        <div>Ribassi</div>
                        {!state.active.includes("on-sale") && <KeyboardArrowDownIcon fontSize={'large'} />}
                        {!!state.active.includes("on-sale") && <KeyboardArrowUpIcon fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <input type={'checkbox'} id="on-sale1" />
                            <label htmlFor="on-sale1">Prezzo in ribasso</label>
                        </div>
                    </div>
                </div>

                <div className={`item ${state.active.includes("genre") ? 'active' : ''}`}>
                    <header onClick={handleActive} data-filter="genre" >
                        <div>Genere</div>
                        {!state.active.includes("genre") && <KeyboardArrowDownIcon fontSize={'large'} />}
                        {!!state.active.includes("genre") && <KeyboardArrowUpIcon fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <input type={'checkbox'} id="genre1" value={'m'} onChange={handleGenreChange} checked={state.filters.genre === 'm' ? true : false} />
                            <label htmlFor="genre1">uomo</label>
                        </div>
                        <div className="item">
                            <input type={'checkbox'} id="genre2" value={'f'} onChange={handleGenreChange} checked={state.filters.genre === 'f' ? true : false} />
                            <label htmlFor="genre2">donna</label>
                        </div>
                        <div className="item">
                            <input type={'checkbox'} id="genre3" value={'u'} onChange={handleGenreChange} checked={state.filters.genre === 'u' ? true : false} />
                            <label htmlFor="genre3">unisex</label>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    )
}

export default FilterMenu;