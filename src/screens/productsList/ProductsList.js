import React, { useState, useEffect } from "react";
import { getProductList, getCategories } from "../../services/productServices";
import ProductCard from '../../components/functionalComponents/ProductCard/ProductCard';
import ProductGridLayout from '../../components/functionalComponents/productGridLayout/ProductGridLayout';
import FilterMenu from "../../components/hookComponents/filterMenu/FilterMenu";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Seo from '../../components/functionalComponents/Seo';

function ProductsList() {
    const location = useLocation();

    const { t } = useTranslation()


    const [state, setState] = useState(
        {
            products: [],
            categories: [],
        }
    )

    useEffect(() => {
        fetchProducts();
        // ogni volta che cambia t (la lingua) ho un rerender e chiamata api con la lingua giusta
    }, [t]);


    async function fetchProducts() {
        const products = await axiosGetProductsList();
        const categories = await axiosGetCategoriesList();
        setState({
            ...state,
            products,
            categories
        })
    };

    async function axiosGetProductsList() {
        const { pathname } = location;

        const result = await getProductList();

        console.log("product list ", result);
        return await result.data;
    }


    async function axiosGetCategoriesList() {
        const result = await getCategories(t("lang"));
        console.log(result);
        return await result.data;
    }

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
            <Seo
                title="Prodotti"
                description="Prodotti"
                content="e-commerce"
            />
            <FilterMenu categories={ state.categories } />
            <ProductGridLayout>
                { state.products?.map(mapProducts) }
            </ProductGridLayout>
        </>
    )
}

export default ProductsList;