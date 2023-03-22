import React, { useState } from "react";
import './filterMenu.scss';

import Button from '../../functionalComponents/button/Button';

import Slider from '@mui/material/Slider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function FilterMenu() {
    const minMax = [20, 1000];
    const sizes = ['m38', 'm39', 'm40', 'm41', 'm42'];
    const categories = ['sneakers', 'stivali', 'sliders', 'sandali', 'infradito', 'eleganti'];
    const brands = [
        "Abercrombie & Fitch",
        "adidas Golf",
        "adidas Originals",
        "adidas performance",
        "adidas Skateboarding",
        "ALDO",
        "AllSaints",
        "Armani Exchange",
        "Asics",
        "ASRA",
        "Barbour",
        "Barbour International",
        "Ben Sherman",
        "Berghaus",
        "Bershka",
        "Birkenstock",
        "Bolongaro Trevor",
        "BOSS by Hugo Boss",
        "Brave Soul",
        "Buffalo",
        "Burton Snowboards",
        "Call it Spring",
        "Calvin Klein",
        "Calvin Klein Jeans",
        "Cat Footwear",
        "Clarks Originals",
        "Columbia",
        "Converse",
        "Crep Protect",
        "Crocs",
        "Devils Advocate",
        "Dr Martens",
        "Dune",
        "EA7",
        "Farah",
        "Fred Perry",
        "French Connection",
        "Gianni Feraud",
        "Good For Nothing",
        "Good News",
        "Havaianas",
        "H by Hudson",
        "Helly Hansen",
        "Hi-Tec",
        "Hollister",
        "HUGO",
        "Hummel",
        "Hunter",
        "Ipanema",
        "Jack & Jones",
        "Jason Mark",
        "Jordan",
        "Kickers",
        "Koi Footwear",
        "Lacoste",
        "Levi's",
        "London Rebel X",
        "Loungeable",
        "Loyalty & Faith",
        "Lyle & Scott",
        "Napapijri",
        "New Balance",
        "New Look",
        "Nike",
        "Nike Golf",
        "Nike Running",
        "Nike SB",
        "Nike Training",
        "Noak",
        "O'Neill",
        "Oakley",
        "Office",
        "On Running",
        "Original Penguin",
        "Palladium",
        "Pier One"];
    const colors = ['arancione', 'argento', 'bianco', 'blu', 'giallo', 'grigio', 'marrone', 'neutro', 'oro'];

    const [state, setState] = useState({
        active: null,
        filters: {
            price: [20, 1000],
            onSale: false,
            genre: null,
            size: null,
            category: null,
            brand: null,
            color: null,
        }
    });

    function resetFilters() {
        setState(
            {
                ...state,
                filters: {
                    price: [20, 1000],
                    onSale: false,
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
        setState({
            ...state,
            filters: {
                ...state.filters,
                price: value,
            }
        });
    };

    function handleSaleChange() {
        setState(prevState => {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    onSale: !prevState.filters.onSale,
                }
            }
        });
    };

    function handleGenreChange(e) {
        let choice = e.target.value;
        if (state.filters.genre === choice) choice = null;
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
        if (state.filters.size === choice) choice = null;
        setState({
            ...state,
            filters: {
                ...state.filters,
                size: choice,
            }
        });
    };

    function handleCategoryChange(e) {
        let choice = e.target.value;
        if (state.filters.category === choice) choice = null;
        setState({
            ...state,
            filters: {
                ...state.filters,
                category: choice,
            }
        });
    };

    function handleBrandChange(e) {
        let choice = e.target.value;
        if (state.filters.brand === choice) choice = null;
        setState({
            ...state,
            filters: {
                ...state.filters,
                brand: choice,
            }
        });
    };

    function handleColorChange(e) {
        let choice = e.target.value;
        if (state.filters.color === choice) choice = null;
        setState({
            ...state,
            filters: {
                ...state.filters,
                color: choice,
            }
        });
    };

    function mapSizes(item, key) {
        return <div className="item" key={ `${key}-${Math.random()}` }>
            <input type={ 'checkbox' } id={ `size-${key + 1}` } value={ item } onChange={ handleSizeChange } checked={ state.filters.size === item ? true : false } />
            <label className="label" htmlFor={ `size-${key + 1}` }>{ item }</label>
        </div>
    }

    function mapCategories(item, key) {
        return <div className="item" key={ `${key}-${Math.random()}` }>
            <input type={ 'checkbox' } id={ `category-${key + 1}` } value={ item } onChange={ handleCategoryChange } checked={ state.filters.category === item ? true : false } />
            <label className="label" htmlFor={ `category-${key + 1}` }>{ item }</label>
        </div>
    }

    function mapBrands(item, key) {
        return <div className="item" key={ `${key}-${Math.random()}` }>
            <input type={ 'checkbox' } id={ `brand-${key + 1}` } value={ item } onChange={ handleBrandChange } checked={ state.filters.brand === item ? true : false } />
            <label className="label" htmlFor={ `brand-${key + 1}` }>{ item }</label>
        </div>
    }

    function mapColors(item, key) {
        return <div className="item" key={ `${key}-${Math.random()}` }>
            <input type={ 'checkbox' } id={ `color-${key + 1}` } value={ item } onChange={ handleColorChange } checked={ state.filters.color === item ? true : false } />
            <label className="label" htmlFor={ `color-${key + 1}` }>{ item }</label>
        </div>
    }



    return (
        <aside className="filter-menu">
            <div className="filter-menu__items">
                <div className={ `item ${state.active === "price" ? 'active' : ''}` }>
                    <header onClick={ handleActive } data-filter="price" className={ `${state.filters.price[0] !== minMax[0] || state.filters.price[1] !== minMax[1] ? 'checked' : ''}` } >
                        <div data-filter="price">prezzo</div>
                        { state.active !== "price" && <KeyboardArrowDownIcon data-filter="price" fontSize={ 'large' } /> }
                        { state.active === "price" && <KeyboardArrowUpIcon data-filter="price" fontSize={ 'large' } /> }
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <div className="label">
                                <div className="price-range">
                                    <div>{ state.filters.price[0] }€</div>
                                    <div>{ state.filters.price[1] }€</div>
                                </div>
                                <Slider
                                    className="mui-slider-modifier"
                                    value={ state.filters.price }
                                    onChange={ handlePriceChange }
                                    valueLabelDisplay="auto"
                                    min={ minMax[0] }
                                    max={ minMax[1] }
                                    color="primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={ `item ${state.active === "on-sale" ? 'active' : ''}` }>
                    <header data-filter="on-sale" onClick={ handleActive } className={ `${!!state.filters.onSale ? 'checked' : ''}` } >
                        <div data-filter="on-sale">ribassi</div>
                        { state.active !== "on-sale" && <KeyboardArrowDownIcon data-filter="on-sale" fontSize={ 'large' } /> }
                        { state.active === "on-sale" && <KeyboardArrowUpIcon data-filter="on-sale" fontSize={ 'large' } /> }
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <input onClick={ handleSaleChange } type={ 'checkbox' } id="on-sale" />
                            <label className="label" htmlFor="on-sale">scarpe in ribasso</label>
                        </div>
                    </div>
                </div>

                <div className={ `item ${state.active === "genre" ? 'active' : ''}` }>
                    <header onClick={ handleActive } data-filter="genre" className={ `${state.filters.genre ? 'checked' : ''}` } >
                        <div data-filter="genre">genere</div>
                        { state.active !== "genre" && <KeyboardArrowDownIcon data-filter="genre" fontSize={ 'large' } /> }
                        { state.active === "genre" && <KeyboardArrowUpIcon data-filter="genre" fontSize={ 'large' } /> }
                    </header>
                    <div className="sub-item">
                        <div className="item">
                            <input type={ 'checkbox' } id="genre1" value={ 'm' } onChange={ handleGenreChange } checked={ state.filters.genre === 'm' ? true : false } />
                            <label className="label" htmlFor="genre1">uomo</label>
                        </div>
                        <div className="item">
                            <input type={ 'checkbox' } id="genre2" value={ 'f' } onChange={ handleGenreChange } checked={ state.filters.genre === 'f' ? true : false } />
                            <label className="label" htmlFor="genre2">donna</label>
                        </div>
                        <div className="item">
                            <input type={ 'checkbox' } id="genre3" value={ 'u' } onChange={ handleGenreChange } checked={ state.filters.genre === 'u' ? true : false } />
                            <label className="label" htmlFor="genre3">unisex</label>
                        </div>
                    </div>
                </div>

                <div className={ `item ${state.active === "size" ? 'active' : ''} ` }>
                    <header onClick={ handleActive } data-filter="size" className={ `${state.filters.size ? 'checked' : ''} ` } >
                        <div data-filter="size">taglia</div>
                        { state.active !== "size" && <KeyboardArrowDownIcon data-filter="size" fontSize={ 'large' } /> }
                        { state.active === "size" && <KeyboardArrowUpIcon data-filter="size" fontSize={ 'large' } /> }
                    </header>
                    <div className="sub-item">
                        { state.active === 'size' && sizes.map(mapSizes) }
                    </div>
                </div>

                <div className={ `item ${state.active === "category" ? 'active' : ''} ` }>
                    <header onClick={ handleActive } data-filter="category" className={ `${state.filters.category ? 'checked' : ''} ` } >
                        <div data-filter="category">categoria</div>
                        { state.active !== "category" && <KeyboardArrowDownIcon data-filter="category" fontSize={ 'large' } /> }
                        { state.active === "category" && <KeyboardArrowUpIcon data-filter="category" fontSize={ 'large' } /> }
                    </header>
                    <div className="sub-item">
                        { state.active === "category" && categories.map(mapCategories) }
                    </div>
                </div>

                <div className={ `item ${state.active === "brand" ? 'active' : ''} ` }>
                    <header onClick={ handleActive } data-filter="brand" className={ `${state.filters.brand ? 'checked' : ''} ` } >
                        <div data-filter="brand">brand</div>
                        { state.active !== "brand" && <KeyboardArrowDownIcon data-filter="brand" fontSize={ 'large' } /> }
                        { state.active === "brand" && <KeyboardArrowUpIcon data-filter="brand" fontSize={ 'large' } /> }
                    </header>
                    <div className="sub-item">
                        { state.active === "brand" && brands.map(mapBrands) }
                    </div>
                </div>

                <div className={ `item ${state.active === "color" ? 'active' : ''} ` }>
                    <header onClick={ handleActive } data-filter="color" className={ `${state.filters.color ? 'checked' : ''} ` } >
                        <div data-filter="color">colore</div>
                        { state.active !== "color" && <KeyboardArrowDownIcon data-filter="color" fontSize={ 'large' } /> }
                        { state.active === "color" && <KeyboardArrowUpIcon data-filter="color" fontSize={ 'large' } /> }
                    </header>
                    <div className="sub-item">
                        { state.active === "color" && colors.map(mapColors) }
                    </div>
                </div>
            </div>
            <div className="filter-menu__actions">
                <Button label={ 'Applica filtri' } buttonStyle={ 'filter-button' } />
                <span onClick={ resetFilters } className="remove">cancella filtri</span>
            </div>
        </aside >
    )
}

export default FilterMenu;