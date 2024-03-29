import React, { useState, useEffect } from "react";
import './filterMenu.scss';

import Button from '../../functionalComponents/button/Button';
import FilterListIcon from '@mui/icons-material/FilterList';

import Slider from '@mui/material/Slider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@mui/material";

import { getCategories, getColors, getBrands } from "../../../services/productServices";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from '../../../assets/translations/i18n';

function FilterMenu(props) {
    const lang = i18n.language.slice(0, 2)

    const { t } = useTranslation()
    const minMax = [20, 200];
    const location = useLocation();
    const { pathname } = location;

    const [state, setState] = useState({
        showFilter: false,
        isMobile: useMediaQuery('(max-width:767px)'),

        active: null,
        brands: [],
        categories: [],
        colors: [],
        showType: true,
        showCategory: true,
        showBrand: true,
        filters: {
            orderBy: null,
            price: null,
            type: null,
            category: null,
            brand: null,
            color: null,
        }
    });

    useEffect(() => {
        fetchFilterParams();
    }, [pathname, lang]);

    async function fetchFilterParams() {
        const pathToArray = pathname.split("/").filter(item => item !== "");

        let showType = true;
        let showCategory = true;
        let showBrand = true;
        const categories = await getCategories(lang);
        const colors = await getColors(lang);
        const brands = await getBrands();

        if (props.types.includes(pathToArray[2])) showType = false;

        for (let i = 0; i < categories.data.length; i++) {
            if (categories.data[i]["code"].toLowerCase().split(" ").join("-") === pathToArray[3]) showCategory = false;
        }

        for (let i = 0; i < brands.data.length; i++) {
            if (brands.data[i]["brand"].toLowerCase().split(" ").join("-") === pathToArray[2]) showBrand = false;
        }

        setState({
            ...state,
            categories: categories.data,
            colors: colors.data,
            brands: brands.data,
            showType,
            showBrand,
            showCategory,
            active: null,
            filters: {
                orderBy: null,
                price: null,
                type: null,
                category: null,
                brand: null,
                color: null,
            }
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

    async function resetFilters() {
        const filters = {
            orderBy: null,
            price: null,
            type: null,
            category: null,
            brand: null,
            color: null,
        }

        await props.filterFunc(filters);

        setState(
            {
                ...state,
                filters: { ...filters }
            }
        )
    }

    function changePrice(event, value) {
        setState({
            ...state,
            filters: {
                ...state.filters,
                price: [...value],
            }
        });
    };

    async function handleOrderByChange(e) {
        const filters = { ...state.filters };
        let choice = e.target.value;
        if (filters.orderBy === choice) choice = null;
        filters.orderBy = choice;

        await props.filterFunc(filters);

        setState({
            ...state,
            filters,
        });
    };

    async function handlePriceChange(event, value) {
        const filters = { ...state.filters };
        filters.price = [...value];

        if (value[0] === minMax[0] && value[1] === minMax[1]) filters.price = null;

        await props.filterFunc(filters);

        setState({
            ...state,
            filters: {
                ...state.filters,
                price: filters.price,
            }
        });
    };

    async function handleTypeChange(e) {
        const filters = { ...state.filters };
        let choice = e.target.value;
        if (filters.type === choice) choice = null;
        filters.type = choice;
        await props.filterFunc(filters);
        setState({
            ...state,
            filters: {
                ...state.filters,
                type: choice,
            }
        });
    };

    async function handleCategoryChange(e) {
        const filters = { ...state.filters };
        let choice = e.target.getAttribute("data-category");
        if (filters.category === choice) choice = null;
        filters.category = choice;
        await props.filterFunc(filters);

        setState({
            ...state,
            filters: {
                ...state.filters,
                category: choice,
            }
        });
    };

    async function handleBrandChange(e) {
        const filters = { ...state.filters };
        let choice = e.target.value;
        if (filters.brand === choice) choice = null;
        filters.brand = choice;
        await props.filterFunc(filters);

        setState({
            ...state,
            filters: {
                ...state.filters,
                brand: choice,
            }
        });
    };

    async function handleColorChange(e) {
        const filters = { ...state.filters };
        let choice = e.target.getAttribute("data-color");
        if (filters.color === choice) choice = null;
        filters.color = choice;
        await props.filterFunc(filters);

        setState({
            ...state,
            filters: {
                ...state.filters,
                color: choice,
            }
        });
    };

    function mapCategories(item, key) {
        return <div className="item" key={`${key}-${Math.random()}`}>
            <input type={'checkbox'} id={`category-${key + 1}`} value={item.category} onChange={handleCategoryChange} data-category={item.code} checked={state.filters.category === item.code ? true : false} />
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
            <input type={'checkbox'} id={`color-${key + 1}`} value={item.color} onChange={handleColorChange} data-color={item.code} checked={state.filters.color === item.code ? true : false} />
            <label className="label" htmlFor={`color-${key + 1}`}>{item.color}</label>
        </div>
    }

    function showFilterMenu() {
        document.body.style.overflow = "hidden";
        setState({
            ...state,
            showFilter: true,
        })
    }

    function hideFilterMenu() {
        document.body.style.removeProperty('overflow');
        setState({
            ...state,
            showFilter: false,
        })
    }

    return (
        <>
            {!!state.isMobile && <div className="filter-menu__show-filter">
                <div onClick={showFilterMenu}>
                    <FilterListIcon fontSize={'large'} />
                    <div>filtra/ordina</div>
                </div>
            </div>}
            <AnimatePresence initial={state.isMobile ? true : false}>
                {(state.showFilter || !state.isMobile) && (
                    <motion.div
                        style={{
                            position: !!state.isMobile ? "absolute" : "static",
                            top: 0,
                            width: "100%",
                            zIndex: 2,
                        }}
                        initial={{ right: "100%" }}
                        animate={{ right: "0%" }}
                        exit={{ right: "100%" }}
                        transition={{
                            duration: 0.1,
                        }}
                    >
                        <aside className={`filter-menu ${state.showFilter ? 'active' : ''}`}>
                            <div className="filter-menu__items">


                                <div className={`item ${state.active === "order" ? 'active' : ''} `}>
                                    <header onClick={handleActive} data-filter="order" className={`${state.filters.orderBy ? 'checked' : ''} `} >
                                        <div data-filter="order">{t("header.organize")}</div>
                                        {state.active !== "order" && <KeyboardArrowDownIcon data-filter="order" fontSize={'large'} />}
                                        {state.active === "order" && <KeyboardArrowUpIcon data-filter="order" fontSize={'large'} />}
                                    </header>
                                    <div className="sub-item">
                                        <div className="item">
                                            <input type={'checkbox'} id="order1" value={'date'} onChange={handleOrderByChange} checked={state.filters.orderBy === 'date' ? true : false} />
                                            <label className="label" htmlFor="order1">{t("header.new")}</label>
                                        </div>
                                    </div>
                                </div>

                                <div className={`item ${state.active === "price" ? 'active' : ''} `}>
                                    <header onClick={handleActive} data-filter="price" className={`${state.filters.price ? 'checked' : ''} `} >
                                        <div data-filter="price">{t("header.price")}</div>
                                        {state.active !== "price" && <KeyboardArrowDownIcon data-filter="price" fontSize={'large'} />}
                                        {state.active === "price" && <KeyboardArrowUpIcon data-filter="price" fontSize={'large'} />}
                                    </header>
                                    <div className="sub-item">
                                        <div className="item">
                                            <div className="label">
                                                <div className="price-range">
                                                    <div>{state.filters.price ? state.filters.price[0] : minMax[0]}€</div>
                                                    <div>{state.filters.price ? state.filters.price[1] : minMax[1]}€</div>
                                                </div>
                                                <Slider
                                                    className="mui-slider-modifier"
                                                    value={state.filters.price ? state.filters.price : minMax}
                                                    onChange={changePrice}
                                                    onChangeCommitted={handlePriceChange}
                                                    valueLabelDisplay="auto"
                                                    min={minMax[0]}
                                                    max={minMax[1]}
                                                    color="primary"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {!!state.showType && <div className={`item ${state.active === "type" ? 'active' : ''} `}>
                                    <header onClick={handleActive} data-filter="type" className={`${state.filters.type ? 'checked' : ''} `} >
                                        <div data-filter="type">{t("header.genre")}</div>
                                        {state.active !== "type" && <KeyboardArrowDownIcon data-filter="type" fontSize={'large'} />}
                                        {state.active === "type" && <KeyboardArrowUpIcon data-filter="type" fontSize={'large'} />}
                                    </header>
                                    <div className="sub-item">
                                        <div className="item">
                                            <input type={'checkbox'} id="type1" value={'m'} onChange={handleTypeChange} checked={state.filters.type === 'm' ? true : false} />
                                            <label className="label" htmlFor="type1">{t("header.man")}</label>
                                        </div>
                                        <div className="item">
                                            <input type={'checkbox'} id="type2" value={'w'} onChange={handleTypeChange} checked={state.filters.type === 'w' ? true : false} />
                                            <label className="label" htmlFor="type2">donna</label>
                                        </div>
                                        <div className="item">
                                            <input type={'checkbox'} id="type3" value={'u'} onChange={handleTypeChange} checked={state.filters.type === 'u' ? true : false} />
                                            <label className="label" htmlFor="type3">unisex</label>
                                        </div>
                                    </div>
                                </div>}

                                {!!state.showCategory && <div className={`item ${state.active === "category" ? 'active' : ''} `}>
                                    <header onClick={handleActive} data-filter="category" className={`${state.filters.category ? 'checked' : ''} `} >
                                        <div data-filter="category">{t("header.category")}</div>
                                        {state.active !== "category" && <KeyboardArrowDownIcon data-filter="category" fontSize={'large'} />}
                                        {state.active === "category" && <KeyboardArrowUpIcon data-filter="category" fontSize={'large'} />}
                                    </header>
                                    <div className="sub-item">
                                        {state.active === "category" && state.categories.map(mapCategories)}
                                    </div>
                                </div>}

                                {!!state.showBrand && <div className={`item ${state.active === "brand" ? 'active' : ''} `}>
                                    <header onClick={handleActive} data-filter="brand" className={`${state.filters.brand ? 'checked' : ''} `} >
                                        <div data-filter="brand">{t("header.brands")}</div>
                                        {state.active !== "brand" && <KeyboardArrowDownIcon data-filter="brand" fontSize={'large'} />}
                                        {state.active === "brand" && <KeyboardArrowUpIcon data-filter="brand" fontSize={'large'} />}
                                    </header>
                                    <div className="sub-item">
                                        {state.active === "brand" && state.brands.map(mapBrands)}
                                    </div>
                                </div>}

                                <div className={`item ${state.active === "color" ? 'active' : ''} `}>
                                    <header onClick={handleActive} data-filter="color" className={`${state.filters.color ? 'checked' : ''} `} >
                                        <div data-filter="color">{t("header.color")}</div>
                                        {state.active !== "color" && <KeyboardArrowDownIcon data-filter="color" fontSize={'large'} />}
                                        {state.active === "color" && <KeyboardArrowUpIcon data-filter="color" fontSize={'large'} />}
                                    </header>
                                    <div className="sub-item">
                                        {state.active === "color" && state.colors.map(mapColors)}
                                    </div>
                                </div>
                            </div>
                            <div className="filter-menu__actions">
                                <Button label={t("button.seeItems")} handleClick={hideFilterMenu} buttonStyle={'filter-button'} />
                                <span onClick={resetFilters} className="remove">{t("button.cancelFilters")}</span>
                            </div>
                        </aside >
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default FilterMenu;