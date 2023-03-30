import React, { useState, useEffect } from "react";
import "./productsList.scss";
import { getProductList } from "../../services/productServices";
import ProductCard from '../../components/functionalComponents/ProductCard/ProductCard';
import ProductGridLayout from '../../components/functionalComponents/productGridLayout/ProductGridLayout';
import FilterMenu from "../../components/hookComponents/filterMenu/FilterMenu";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function ProductsList() {
    const location = useLocation();

    const { t } = useTranslation()

    const [state, setState] = useState(
        {
            products: [],
        }
    )

    useEffect(() => {
        fetchProducts();
        // ogni volta che cambia t (la lingua) ho un rerender e chiamata api con la lingua giusta
    }, [t]);


    async function fetchProducts() {
        const { pathname } = location;

        const result = await getProductList(0);
        console.log(result)
        setState({
            ...state,
            products: result.data.products,
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
        const result = await getProductList(0, params);

        setState({
            ...state,
            products: result.data.products,
        })
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
                filterFunc={fetchFilteredProducts}
            />
            <ProductGridLayout>
                {state.products?.map(mapProducts)}
            </ProductGridLayout>
        </div>
    )
}

export default ProductsList;