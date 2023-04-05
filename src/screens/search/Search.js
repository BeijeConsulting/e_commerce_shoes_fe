import React, { useState, useEffect } from "react";
import "./search.scss";

import ProductCard from "../../components/functionalComponents/ProductCard/ProductCard";
import ProductGridLayout from "../../components/functionalComponents/productGridLayout/ProductGridLayout";
import Pagination from '@mui/material/Pagination';
import { useSearchParams, useNavigate } from "react-router-dom";
import { getSearchProducts } from "../../services/productServices";
import i18n from "../../assets/translations/i18n";
import { useTranslation } from 'react-i18next';

function Search() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const searchTerm = searchParams.get("q");
    const term = searchParams.get("q") ? searchParams.get("q")?.split("-").join(" ") : "";
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
            key={`${key}-${Math.random()}`}
            image={item.image_preview}
            imageAlt={item.title}
            category={item.category}
            brand={item.brand}
            name={item.name}
            initialPrice={item.starting_price}
            price={item.starting_price + 30}
            idProduct={item.id}
        />
    }

    function goToMan() {
        navigate(`/${lang}/scarpe/uomo`)
    }

    function goToWoman() {
        navigate(`/${lang}/scarpe/donna`)
    }

    function goToUnisex() {
        navigate(`/${lang}/scarpe/unisex`)
    }

    function goToBrands() {
        navigate(`/${lang}/brand`)
    }

    function goToNewArrivals() {
        navigate(`/${lang}/scarpe/novita`)
    }

    return (
        <div className="search">
            {!!state.foundProducts &&
                <>
                    <h1>
                        <div>{t("search.hasResults")}</div>
                        <div className="search__term">"{term}"</div>
                    </h1>
                    <ProductGridLayout>
                        {state.products.map(mapProducts)}
                    </ProductGridLayout>
                    {
                        state.pages > 1 && <div className="pagination">
                            <Pagination onChange={fetchPaginatedProducts} page={state.currentPage} count={state.pages} size={"large"} />
                        </div>
                    }
                </>
            }
            {state.foundProducts === false &&
                <div className="search-no-products">
                    <img src={require("../../assets/images/no-products.png")} alt="no products found" />
                    <div>
                        <h1>{t("search.noResults")}</h1>
                        <p>{t("search.p1")} <strong>{term}</strong> {t("search.p2")}</p>
                        <ol>
                            <li>{t("search.li1")}</li>
                            <li>{t("search.li2")}</li>
                            <li>{t("search.li3")}</li>
                        </ol>
                        <h2>{t("search.h2")}</h2>
                        <nav>
                            <ul>
                                <li><a onClick={goToMan}>{t("header.man")}</a></li>
                                <li><a onClick={goToWoman}>{t("header.woman")}</a></li>
                                <li><a onClick={goToUnisex}>unisex</a></li>
                                <li><a onClick={goToBrands}>{t("header.brands")}</a></li>
                                <li><a onClick={goToNewArrivals}>{t("header.new")}</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            }
        </div>
    )
}

export default Search;