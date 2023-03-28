import React, { useState, useEffect } from "react";
import './filterMenu.scss';

import Button from '../../functionalComponents/button/Button';

import Slider from '@mui/material/Slider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { getCategories, getColors, getBrands, getSizes } from "../../../services/productServices";

function FilterMenu(props) {
    const minMax = [20, 1000];

    const [state, setState] = useState({
        active: null,
        sizes: [],
        brands: [],
        categories: [],
        colors: [],
        filters: {
            price: [20, 1000],
            genre: null,
            size: null,
            category: null,
            brand: null,
            color: null,
        }
    });

    useEffect(() => {
        fetchFilterParams();
    }, []);

    async function fetchFilterParams() {
        const categories = await getCategories("it");
        const colors = await getColors("it");
        const brands = await getBrands();
        const sizes = await getSizes();
        setState({
            ...state,
            categories: categories.data,
            colors: colors.data,
            brands: brands.data,
            sizes: sizes.data,
        })
    };

    function resetFilters() {
        setState(
            {
                ...state,
                filters: {
                    price: [20, 1000],
                    genre: null,
                    size: null,
                    category: null,
                    brand: null,
                    color: null,
                }
            }
        )
    }

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

    function handlePriceChange(event, value) {
        const filters = { ...state.filters };
        filters.price = [...value];

        props.filterFunc(filters);

        setState({
            ...state,
            filters: {
                ...state.filters,
                price: filters.price,
            }
        });
    };

    function handleGenreChange(e) {
        const filters = { ...state.filters };

        let choice = e.target.value;
        if (filters.genre === choice) choice = null;

        filters.genre = choice;
        props.filterFunc(filters);

        setState({
            ...state,
            filters: {
                ...state.filters,
                genre: choice,
            }
        });
    };

    function handleSizeChange(e) {
        const filters = { ...state.filters };

        let choice = e.target.value;
        if (filters.size === choice) choice = null;

        filters.size = choice;
        props.filterFunc(filters);

        setState({
            ...state,
            filters: {
                ...state.filters,
                size: choice,
            }
        });
    };

    function handleCategoryChange(e) {
        const filters = { ...state.filters };

        let choice = e.target.value;
        if (filters.category === choice) choice = null;

        filters.category = choice;
        props.filterFunc(filters);

        setState({
            ...state,
            filters: {
                ...state.filters,
                category: choice,
            }
        });
    };

    function handleBrandChange(e) {
        const filters = { ...state.filters };

        let choice = e.target.value;
        if (filters.brand === choice) choice = null;

        filters.brand = choice;
        props.filterFunc(filters);

        setState({
            ...state,
            filters: {
                ...state.filters,
                brand: choice,
            }
        });
    };

    function handleColorChange(e) {
        const filters = { ...state.filters };

        let choice = e.target.value;
        if (filters.color === choice) choice = null;

        filters.color = choice;
        props.filterFunc(filters);

        setState({
            ...state,
            filters: {
                ...state.filters,
                color: choice,
            }
        });
    };

    function mapSizes(item, key) {
        return <div className="item" key={`${key}-${Math.random()}`}>
            <input type={'checkbox'} id={`size-${key + 1}`} value={item} onChange={handleSizeChange} checked={state.filters.size === item ? true : false} />
            <label className="label" htmlFor={`size-${key + 1}`}>{item}</label>
        </div>
    }

    function mapCategories(item, key) {
        return <div className="item" key={`${key}-${Math.random()}`}>
            <input type={'checkbox'} id={`category-${key + 1}`} value={item.category} onChange={handleCategoryChange} checked={state.filters.category === item.category ? true : false} />
            <label className="label" htmlFor={`category-${key + 1}`}>{item.category}</label>
        </div>
    }

    function mapBrands(item, key) {
        return <div className="item" key={`${key}-${Math.random()}`}>
            <input type={'checkbox'} id={`brand-${key + 1}`} value={item.brand} onChange={handleBrandChange} checked={state.filters.brand === item.brand ? true : false} />
            <label className="label" htmlFor={`brand-${key + 1}`}>{item.brand}</label>
        </div>
    }

    function mapColors(item, key) {
        return <div className="item" key={`${key}-${Math.random()}`}>
            <input type={'checkbox'} id={`color-${key + 1}`} value={item.color} onChange={handleColorChange} checked={state.filters.color === item.color ? true : false} />
            <label className="label" htmlFor={`color-${key + 1}`}>{item.color}</label>
        </div>
    }

    return (
        <aside className="filter-menu">
            <div className="filter-menu__items">
                <div className={`item ${state.active === "price" ? 'active' : ''}`}>
                    <header onClick={handleActive} data-filter="price" className={`${state.filters.price[0] !== minMax[0] || state.filters.price[1] !== minMax[1] ? 'checked' : ''}`} >
                        <div data-filter="price">prezzo</div>
                        {state.active !== "price" && <KeyboardArrowDownIcon data-filter="price" fontSize={'large'} />}
                        {state.active === "price" && <KeyboardArrowUpIcon data-filter="price" fontSize={'large'} />}
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

                <div className={`item ${state.active === "genre" ? 'active' : ''}`}>
                    <header onClick={handleActive} data-filter="genre" className={`${state.filters.genre ? 'checked' : ''}`} >
                        <div data-filter="genre">genere</div>
                        {state.active !== "genre" && <KeyboardArrowDownIcon data-filter="genre" fontSize={'large'} />}
                        {state.active === "genre" && <KeyboardArrowUpIcon data-filter="genre" fontSize={'large'} />}
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

                <div className={`item ${state.active === "size" ? 'active' : ''} `}>
                    <header onClick={handleActive} data-filter="size" className={`${state.filters.size ? 'checked' : ''} `} >
                        <div data-filter="size">taglia</div>
                        {state.active !== "size" && <KeyboardArrowDownIcon data-filter="size" fontSize={'large'} />}
                        {state.active === "size" && <KeyboardArrowUpIcon data-filter="size" fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        {state.active === 'size' && state.sizes.map(mapSizes)}
                    </div>
                </div>

                <div className={`item ${state.active === "category" ? 'active' : ''} `}>
                    <header onClick={handleActive} data-filter="category" className={`${state.filters.category ? 'checked' : ''} `} >
                        <div data-filter="category">categoria</div>
                        {state.active !== "category" && <KeyboardArrowDownIcon data-filter="category" fontSize={'large'} />}
                        {state.active === "category" && <KeyboardArrowUpIcon data-filter="category" fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        {state.active === "category" && state.categories.map(mapCategories)}
                    </div>
                </div>

                <div className={`item ${state.active === "brand" ? 'active' : ''} `}>
                    <header onClick={handleActive} data-filter="brand" className={`${state.filters.brand ? 'checked' : ''} `} >
                        <div data-filter="brand">brand</div>
                        {state.active !== "brand" && <KeyboardArrowDownIcon data-filter="brand" fontSize={'large'} />}
                        {state.active === "brand" && <KeyboardArrowUpIcon data-filter="brand" fontSize={'large'} />}
                    </header>
                    <div className="sub-item">
                        {state.active === "brand" && state.brands.map(mapBrands)}
                    </div>
                </div>

                <div className={`item ${state.active === "color" ? 'active' : ''} `}>
                    <header onClick={handleActive} data-filter="color" className={`${state.filters.color ? 'checked' : ''} `} >
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
                <Button label={'Applica filtri'} buttonStyle={'filter-button'} />
                <span onClick={resetFilters} className="remove">cancella filtri</span>
            </div>
        </aside >
    )
}

export default FilterMenu;