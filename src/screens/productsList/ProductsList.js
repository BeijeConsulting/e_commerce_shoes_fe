import React, { useState, useEffect } from "react";
import "./productsList.scss";
import { getProductsList, getNewProductsList } from "../../services/productServices";
import ProductCard from '../../components/functionalComponents/ProductCard/ProductCard';
import ProductGridLayout from '../../components/functionalComponents/productGridLayout/ProductGridLayout';
import FilterMenu from "../../components/hookComponents/filterMenu/FilterMenu";
import { useLocation } from "react-router-dom";
import i18n from "../../assets/translations/i18n";
import Pagination from '@mui/material/Pagination';

function ProductsList() {
    const location = useLocation();
    const { pathname } = location;
    const lang = i18n.language.slice(0, 2);
    const types = ["men", "woman", "unisex"]
    const pathToArray = pathname.split("/").filter(item => item !== "");

    const [state, setState] = useState(
        {
            products: [],
            query: "",
            pages: null,
            currentPage: 1,
        }
    )

    useEffect(() => {
        fetchProducts();
    }, [pathname]);


    async function fetchProducts(obj = undefined) {
        let type = null;
        let category = null;
        let result = null;
        let query = "";


        if (pathToArray.length === 3) {
            if (pathToArray[2] !== "new") {
                type = pathToArray[2].slice(0, 1);
                query = `?type=${type}`;
            }
        } else if (pathToArray.length === 4) {
            type = pathToArray[2].slice(0, 1);
            category = pathToArray[3].split("-").join("%20");
            query = `?type=${type}&category=${category}`;
        }

        if (obj) {
            if (obj.type === null) obj.type = type;
            if (obj.category === null) obj.category = category;
            query = getQuery(obj);
        }

        if (pathToArray[2] === "new") {
            result = await getNewProductsList(0, lang, query);
        } else {
            result = await getProductsList(0, lang, query);
        }

        console.log("RESULT", result.data);

        setState({
            ...state,
            products: result.data.products,
            pages: result.data.pages,
            query,
        })
    };

    async function fetchPaginatedProducts(e, p) {
        const currentPage = p - 1;
        const query = state.query;
        let result = null;

        if (pathToArray[2] === "new") {
            result = await getNewProductsList(currentPage, lang, query);
        } else {
            result = await getProductsList(currentPage, lang, query);
        }

        setState({
            ...state,
            products: result.data.products,
            currentPage: currentPage + 1,
        })
    };

    function getQuery(obj) {
        let query = "?";
        for (let key in obj) {
            if (obj[key] !== null) {
                if (key === "price") {
                    query += `minPrice=${obj[key][0]}&maxPrice=${obj[key][1]}&`
                } else {
                    query += `${key}=${obj[key]}&`
                }
            };
        }
        if (query.length < 2) query = "";
        if (query) query = query.slice(0, query.length - 1);
        return query;
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

    return (
        <div className="products-list">
            <FilterMenu
                types={types}
                filterFunc={fetchProducts}
            />
            <ProductGridLayout>
                {state.products?.map(mapProducts)}
            </ProductGridLayout>
            {
                state.pages > 1 && <div className="pagination">
                    <Pagination onChange={fetchPaginatedProducts} page={state.currentPage} count={state.pages} size={"large"} />
                </div>
            }
        </div>
    )
}

export default ProductsList;