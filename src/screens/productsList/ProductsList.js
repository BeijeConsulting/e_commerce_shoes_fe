import React, { useState, useEffect } from "react";
import "./productsList.scss";
import { getProductList } from "../../services/productServices";
import ProductCard from '../../components/functionalComponents/ProductCard/ProductCard';
import ProductGridLayout from '../../components/functionalComponents/productGridLayout/ProductGridLayout';
import FilterMenu from "../../components/hookComponents/filterMenu/FilterMenu";
import { useLocation } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import Seo from '../../components/functionalComponents/Seo';

function ProductsList() {
    const location = useLocation();

    const minMax = [20, 200];
    const { t } = useTranslation()

    const [state, setState] = useState(
        {
            products: [],
            showFilter: false,
            filters: {
                orderBy: null,
                price: null,
                type: null,
                category: null,
                brand: null,
                color: null,
            }
        }
    )

    useEffect(() => {
        fetchProducts();
        // ogni volta che cambia t (la lingua) ho un rerender e chiamata api con la lingua giusta
    }, [t]);


    async function fetchProducts() {
        const { pathname } = location;

        const products = await getProductList(0);
        setState({
            ...state,
            products: products.data.products,
        })
    };

    async function fetchFilteredProducts(obj) {
        let params = "?";

        for (let key in obj) {
            if (obj[key] !== null) {
                if (key === "price") {
                    params += `minPrice=${obj[key][0]}&maxPrice=${obj[key][1]}&`
                } else {
                    params += `${key}=${obj[key]}&`
                }
            };
        }

        if (params.length === 1) params = "";

        if (params) params = params.slice(0, params.length - 1);
        console.log(params);
        const result = await getProductList(params);
        return result.data;
    }

    function mapProducts(item, key) {
        return <ProductCard
            key={`${key}-${Math.random()}`}
            image={"https://www.cisalfasport.it/dw/image/v2/BBVV_PRD/on/demandware.static/-/Sites-cisalfa-master/default/dwdc711253/cisalfa/files/S5544515-18/image/S5544515_18.jpg?sw=444&sh=555"}
            imageAlt={item.title}
            category={item.category}
            brand={item.brand}
            name={item.name}
            initialPrice={item.starting_price}
            price={item.starting_price + 30}
            idProduct={item.id}
        />
    }

    function showFilterMenu() {
        setState({
            ...state,
            showFilter: true,
        })
    }

    function hideFilterMenu() {
        setState({
            ...state,
            showFilter: false,
        })
    }

    function resetFilters() {
        setState(
            {
                ...state,
                filters: {
                    orderBy: null,
                    price: null,
                    type: null,
                    category: null,
                    brand: null,
                    color: null,
                },
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
        console.log(state.filters)
        const filters = { ...state.filters };
        let choice = e.target.value;
        if (filters.orderBy === choice) choice = null;
        filters.orderBy = choice;

        const products = await fetchFilteredProducts(filters);

        setState({
            ...state,
            filters,
            products,
        });
    };

    async function handlePriceChange(event, value) {
        const filters = { ...state.filters };
        filters.price = [...value];

        if (value[0] === minMax[0] && value[1] === minMax[1]) filters.price = null;

        const products = await fetchFilteredProducts(filters);

        setState({
            ...state,
            products,
            filters: {
                ...state.filters,
                price: filters.price,
            }
        });
    };

    async function handleTypeChange(e) {
        const filters = { ...state.filters };
        console.log(filters)
        let choice = e.target.value;
        if (filters.type === choice) choice = null;
        filters.type = choice;
        const products = await fetchFilteredProducts(filters);

        setState({
            ...state,
            products,
            filters: {
                ...state.filters,
                type: choice,
            }
        });
    };

    async function handleCategoryChange(e) {
        const filters = { ...state.filters };
        let choice = e.target.value;
        if (filters.category === choice) choice = null;
        filters.category = choice;
        const products = await fetchFilteredProducts(filters);

        setState({
            ...state,
            products,
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
        const products = await fetchFilteredProducts(filters);

        setState({
            ...state,
            products,
            filters: {
                ...state.filters,
                brand: choice,
            }
        });
    };

    async function handleColorChange(e) {
        const filters = { ...state.filters };
        let choice = e.target.value;
        if (filters.color === choice) choice = null;
        filters.color = choice;
        console.log(filters)
        const products = await fetchFilteredProducts(filters);

        setState({
            ...state,
            products,
            filters: {
                ...state.filters,
                color: choice,
            }
        });
    };

    return (
        <div className="products-list">
            <div className="products-list__show-filter">
                <div onClick={showFilterMenu}>
                    <FilterListIcon fontSize={'large'} />
                    <div>filtra/ordina</div>
                </div>
            </div>
            <AnimatePresence>
                {state.showFilter && (
                    <motion.div
                        style={{
                            position: "absolute",
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
                        <FilterMenu
                            screenType={"mobile"}
                            minMax={minMax}
                            handleColorChange={handleColorChange}
                            handleBrandChange={handleBrandChange}
                            handleCategoryChange={handleCategoryChange}
                            handleTypeChange={handleTypeChange}
                            handlePriceChange={handlePriceChange}
                            handleOrderByChange={handleOrderByChange}
                            changePrice={changePrice}
                            resetFilters={resetFilters}
                            filters={state.filters}
                            showFilter={state.showFilter}
                            hideFilterMenu={hideFilterMenu}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <FilterMenu
                screenType={"desktop"}
                minMax={minMax}
                handleColorChange={handleColorChange}
                handleBrandChange={handleBrandChange}
                handleCategoryChange={handleCategoryChange}
                handleTypeChange={handleTypeChange}
                handlePriceChange={handlePriceChange}
                handleOrderByChange={handleOrderByChange}
                changePrice={changePrice}
                resetFilters={resetFilters}
                filters={state.filters}
                hideFilterMenu={hideFilterMenu}
            />
            <ProductGridLayout>
                {state.products?.map(mapProducts)}
            </ProductGridLayout>
        </div>
    )
}

export default ProductsList;