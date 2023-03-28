import React, { useState, useEffect } from "react";
import './filterMenu.scss';

import Button from '../../functionalComponents/button/Button';

import Slider from '@mui/material/Slider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { getCategories, getColors, getBrands } from "../../../services/productServices";

function FilterMenu(props) {
    const [state, setState] = useState({
        active: null,
        brands: [],
        categories: [],
        colors: [],
    });

    useEffect(() => {
        fetchFilterParams();
    }, []);

    async function fetchFilterParams() {
        const categories = await getCategories("it");
        const colors = await getColors("it");
        const brands = await getBrands();
        setState({
            ...state,
            categories: categories.data,
            colors: colors.data,
            brands: brands.data,
        })
    };

    function handleActive(event) {
        let active = event.target.getAttribute('data-filter');
        if (state.active === active) active = null;

        setState(
            {
                ...state,
                active,
            }
        )
    }

    function mapCategories(item, key) {
        return <div className="item" key={`${key}-${Math.random()}`}>
            <input type={'checkbox'} id={`category-${key + 1}`} value={item.category} onChange={props.handleCategoryChange} checked={props.filters.category === item.category ? true : false} />
            <label className="label" htmlFor={`category-${key + 1}`}>{item.category}</label>
        </div>
    }

    function mapBrands(item, key) {
        return <div className="item" key={`${key}-${Math.random()}`}>
            <input type={'checkbox'} id={`brand-${key + 1}`} value={item.brand} onChange={props.handleBrandChange} checked={props.filters.brand === item.brand ? true : false} />
            <label className="label" htmlFor={`brand-${key + 1}`}>{item.brand}</label>
        </div>
    }

    function mapColors(item, key) {
        return <div className="item" key={`${key}-${Math.random()}`}>
            <input type={'checkbox'} id={`color-${key + 1}`} value={item.color} onChange={props.handleColorChange} checked={props.filters.color === item.color ? true : false} />
            <label className="label" htmlFor={`color-${key + 1}`}>{item.color}</label>
        </div>
    }

    return (
        <aside className={`filter-menu ${props.showFilter ? 'active' : ''} ${props.screenType} `}>
            <div className="filter-menu__items">


                <div className={`item ${state.active === "order" ? 'active' : ''} `}>
                    <header onClick={handleActive} data-filter="order" className={`${props.filters.orderBy ? 'checked' : ''} `} >
                        <div data-filter="order">ordina</div>
                        {state.active !== "order" && <KeyboardArrowDownIcon data-filter="order" fontSize={'large'} />}
                        {state.active === "order" && <KeyboardArrowUpIcon data-filter="order" fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <input type={'checkbox'} id="order1" value={'date'} onChange={props.handleOrderByChange} checked={props.filters.orderBy === 'date' ? true : false} />
                            <label className="label" htmlFor="order1">novità</label>
                        </div>
                        <div className="item">
                            <input type={'checkbox'} id="order2" value={'price.desc'} onChange={props.handleOrderByChange} checked={props.filters.orderBy === 'price.desc' ? true : false} />
                            <label className="label" htmlFor="order2">prezzo: alto-basso</label>
                        </div>
                        <div className="item">
                            <input type={'checkbox'} id="order3" value={'price.asc'} onChange={props.handleOrderByChange} checked={props.filters.orderBy === 'price.asc' ? true : false} />
                            <label className="label" htmlFor="order3">prezzo: basso-alto</label>
                        </div>
                    </div>
                </div>

                <div className={`item ${state.active === "price" ? 'active' : ''} `}>
                    <header onClick={handleActive} data-filter="price" className={`${props.filters.price ? 'checked' : ''} `} >
                        <div data-filter="price">prezzo</div>
                        {state.active !== "price" && <KeyboardArrowDownIcon data-filter="price" fontSize={'large'} />}
                        {state.active === "price" && <KeyboardArrowUpIcon data-filter="price" fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <div className="label">
                                <div className="price-range">
                                    <div>{props.filters.price ? props.filters.price[0] : props.minMax[0]}€</div>
                                    <div>{props.filters.price ? props.filters.price[1] : props.minMax[1]}€</div>
                                </div>
                                <Slider
                                    className="mui-slider-modifier"
                                    value={props.filters.price ? props.filters.price : props.minMax}
                                    onChange={props.changePrice}
                                    onChangeCommitted={props.handlePriceChange}
                                    valueLabelDisplay="auto"
                                    min={props.minMax[0]}
                                    max={props.minMax[1]}
                                    color="primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`item ${state.active === "type" ? 'active' : ''} `}>
                    <header onClick={handleActive} data-filter="type" className={`${props.filters.type ? 'checked' : ''} `} >
                        <div data-filter="type">genere</div>
                        {state.active !== "type" && <KeyboardArrowDownIcon data-filter="type" fontSize={'large'} />}
                        {state.active === "type" && <KeyboardArrowUpIcon data-filter="type" fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <input type={'checkbox'} id="type1" value={'m'} onChange={props.handleTypeChange} checked={props.filters.type === 'm' ? true : false} />
                            <label className="label" htmlFor="type1">uomo</label>
                        </div>
                        <div className="item">
                            <input type={'checkbox'} id="type2" value={'w'} onChange={props.handleTypeChange} checked={props.filters.type === 'w' ? true : false} />
                            <label className="label" htmlFor="type2">donna</label>
                        </div>
                        <div className="item">
                            <input type={'checkbox'} id="type3" value={'u'} onChange={props.handleTypeChange} checked={props.filters.type === 'u' ? true : false} />
                            <label className="label" htmlFor="type3">unisex</label>
                        </div>
                    </div>
                </div>

                <div className={`item ${state.active === "category" ? 'active' : ''} `}>
                    <header onClick={handleActive} data-filter="category" className={`${props.filters.category ? 'checked' : ''} `} >
                        <div data-filter="category">categoria</div>
                        {state.active !== "category" && <KeyboardArrowDownIcon data-filter="category" fontSize={'large'} />}
                        {state.active === "category" && <KeyboardArrowUpIcon data-filter="category" fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        {state.active === "category" && state.categories.map(mapCategories)}
                    </div>
                </div>

                <div className={`item ${state.active === "brand" ? 'active' : ''} `}>
                    <header onClick={handleActive} data-filter="brand" className={`${props.filters.brand ? 'checked' : ''} `} >
                        <div data-filter="brand">brand</div>
                        {state.active !== "brand" && <KeyboardArrowDownIcon data-filter="brand" fontSize={'large'} />}
                        {state.active === "brand" && <KeyboardArrowUpIcon data-filter="brand" fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        {state.active === "brand" && state.brands.map(mapBrands)}
                    </div>
                </div>

                <div className={`item ${state.active === "color" ? 'active' : ''} `}>
                    <header onClick={handleActive} data-filter="color" className={`${props.filters.color ? 'checked' : ''} `} >
                        <div data-filter="color">colore</div>
                        {state.active !== "color" && <KeyboardArrowDownIcon data-filter="color" fontSize={'large'} />}
                        {state.active === "color" && <KeyboardArrowUpIcon data-filter="color" fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        {state.active === "color" && state.colors.map(mapColors)}
                    </div>
                </div>
            </div>
            <div className="filter-menu__actions">
                <Button label={'visualizza articoli'} handleClick={props.hideFilterMenu} buttonStyle={'filter-button'} />
                <span onClick={props.resetFilters} className="remove">cancella filtri</span>
            </div>
        </aside >
    )
}

export default FilterMenu;