import React, { useState, useEffect } from "react";
import "./search.scss";

import ProductCard from "../../components/functionalComponents/ProductCard/ProductCard";
import FilterMenu from "../../components/hookComponents/filterMenu/FilterMenu";
import ProductGridLayout from "../../components/functionalComponents/productGridLayout/ProductGridLayout";

import { useSearchParams } from "react-router-dom";
import { getSearchProducts, getCategories } from "../../services/productServices";

function Search() {
    const [searchParams] = useSearchParams();

    const [state, setState] = useState(
        {
            products: [],
            categories: [],
            foundProducts: null,
        }
    )

    useEffect(() => {
        fetchProducts();
    }, [searchParams.get("q")]);

    async function fetchProducts() {
        const searchTerm = searchParams.get("q");
        const products = await getSearchProducts(searchTerm, "0");
        console.log(products)
        const categories = await getCategories("it");
        const foundProducts = products.data.products.length > 0;
        setState({
            products: products.data.products,
            categories: categories.data,
            foundProducts,
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
                    <FilterMenu />
                    <ProductGridLayout>
                        {state.products.map(mapProducts)}
                    </ProductGridLayout>
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