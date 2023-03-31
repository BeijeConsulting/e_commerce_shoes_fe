import React, { useState, useEffect } from "react";
import "./search.scss";

import ProductCard from "../../components/functionalComponents/ProductCard/ProductCard";
import ProductGridLayout from "../../components/functionalComponents/productGridLayout/ProductGridLayout";
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from "react-router-dom";
import { getSearchProducts } from "../../services/productServices";
import i18n from "../../assets/translations/i18n";

function Search() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("q");
    const lang = i18n.language.slice(0, 2);
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
        const products = await getSearchProducts(0, lang, searchTerm);
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
        const currentPage = p - 1;
        const products = await getSearchProducts(currentPage, lang, searchTerm);
        setState({
            ...state,
            products: products.data.products,
            pages: products.data.pages,
            currentPage: currentPage + 1,
        })
    };

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
        <>
            {!!state.foundProducts &&
                <>
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
                        <h1>Nessun risultato di ricerca</h1>
                        <p>La ricerca <strong>{searchParams.get("q").split("-").join(" ")}</strong> non ha prodotto alcun risultato. Prova nuovamente la ricerca con questi accorgimenti:</p>
                        <ol>
                            <li>Controlla attentamente la parola cercata</li>
                            <li>Limita la ricerca a una o due parole</li>
                            <li>Cerca di usare termini meno specifici e più generici</li>
                        </ol>
                        <h2>Continua a esplorare il nostro sito web</h2>
                        <nav>
                            <ul>
                                <li><a href="">uomo</a></li>
                                <li><a href="">donna</a></li>
                                <li><a href="">unisex</a></li>
                                <li><a href="">brand</a></li>
                                <li><a href="">offerte</a></li>
                                <li><a href="">nuovi arrivi</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            }
        </>
    )
}

export default Search;