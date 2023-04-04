import React, { useState, useEffect } from "react";
import "./search.scss";

import ProductCard from "../../components/functionalComponents/ProductCard/ProductCard";
import ProductGridLayout from "../../components/functionalComponents/productGridLayout/ProductGridLayout";
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from "react-router-dom";
import { getSearchProducts } from "../../services/productServices";
import i18n from "../../assets/translations/i18n";
import { useTranslation } from 'react-i18next';

function Search() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("q");
    const lang = i18n.language.slice(0, 2);
    const { t } = useTranslation()
    const [state, setState] = useState(
        {
            products: [],
            foundProducts: null,
            pages: null,
            currentPage: 1,
        }
    )


    useEffect(() => {
        fetchProducts();
    }, [searchParams.get("q")]);

    async function fetchProducts() {
        const products = await getSearchProducts(state.currentPage, lang, searchTerm);
        const foundProducts = products.data.products.length > 0;
        setState({
            ...state,
            products: products.data.products,
            foundProducts,
            pages: products.data.pages,
        })
    };

    async function fetchPaginatedProducts(e, p) {
        const searchTerm = searchParams.get("q");
        const products = await getSearchProducts(p, lang, searchTerm);
        setState({
            ...state,
            products: products.data.products,
            pages: products.data.pages,
            currentPage: p,
        })
    };

    function mapProducts(item, key) {
        return <ProductCard
            key={ `${key}-${Math.random()}` }
            image={ "https://www.cisalfasport.it/dw/image/v2/BBVV_PRD/on/demandware.static/-/Sites-cisalfa-master/default/dwdc711253/cisalfa/files/S5544515-18/image/S5544515_18.jpg?sw=444&sh=555" }
            imageAlt={ item.title }
            category={ item.category }
            brand={ item.brand }
            name={ item.name }
            initialPrice={ item.starting_price }
            price={ item.starting_price + 30 }
            idProduct={ item.id }
        />
    }

    return (
        <>
            { !!state.foundProducts &&
                <>
                    <ProductGridLayout>
                        { state.products.map(mapProducts) }
                    </ProductGridLayout>
                    {
                        state.pages > 1 && <div className="pagination">
                            <Pagination onChange={ fetchPaginatedProducts } page={ state.currentPage } count={ state.pages } size={ "large" } />
                        </div>
                    }
                </>
            }
            { state.foundProducts === false &&
                <div className="search-no-products">
                    <img src={ require("../../assets/images/no-products.png") } alt="no products found" />
                    <div>
                        <h1>{ t("search.h1") }</h1>
                        <p>{ t("search.p1") } <strong>{ searchParams.get("q").split("-").join(" ") }</strong> { t("search.p2") }</p>
                        <ol>
                            <li>{ t("search.li1") }</li>
                            <li>{ t("search.li2") }</li>
                            <li>{ t("search.li3") }</li>
                        </ol>
                        <h2>{ t("search.h2") }</h2>
                        <nav>
                            <ul>
                                <li><a href="">{ t("header.man") }</a></li>
                                <li><a href="">{ t("header.woman") }</a></li>
                                <li><a href="">unisex</a></li>
                                <li><a href="">{ t("header.brands") }</a></li>
                                <li><a href="">{ t("header.sales") }</a></li>
                                <li><a href="">{ t("header.new") }</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            }
        </>
    )
}

export default Search;