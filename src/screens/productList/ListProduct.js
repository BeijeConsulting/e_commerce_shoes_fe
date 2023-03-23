import React, { useState, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { getProductList } from "../../services/productServices";
import { getCategories } from "../../services/productServices";
import ProductCard from '../../components/functionalComponents/ProductCard/ProductCard';

function ListProduct() {
    const [state, setState] = useState(
        {
            products: [],
            categories: [],
        }
    )

    useEffect(() => {
        async function fetchData() {
            const products = await axiosGetProductsList();
            const categories = await axiosGetCategoriesList();
            setState({
                products,
                categories,
            })
        };
        fetchData();
    }, []);

    const location = useLocation();


    function getType() {
        console.log(location);

        let type = '';

        if (location.pathname.includes('uomo')) type = 'm';
        if (location.pathname.includes('donna')) type = 'w';
        if (location.pathname.includes('unisex')) type = 'u';

        // if (location.pathname.includes('offerte')) directory = 'u';
        // if (location.pathname.includes('nuovi-arrivi')) directory = 'u';
        return type;
    };

    function getCategory() {
        let category = '';

        if (location.pathname.includes('basket')) category = 'basketball';
        if (location.pathname.includes('calcio')) category = 'calcio';
        if (location.pathname.includes('camminata')) category = 'camminata';
        if (location.pathname.includes('corsa')) category = 'corsa';
        if (location.pathname.includes('cross-training')) category = 'cross-training';
        if (location.pathname.includes('fitness')) category = 'fitness';
        if (location.pathname.includes('skate')) category = 'skate';
        if (location.pathname.includes('sneakers')) category = 'sneakers';
        if (location.pathname.includes('trail-running')) category = 'trail-running';

        return category;
    };

    function getDirectory() {
        let directory = '';
        if (location.pathname.includes('offerte')) directory = 'u';
        if (location.pathname.includes('nuovi-arrivi')) directory = 'u';
        return directory;
    };

    function getPath() {
        const type = getType();
        const category = getCategory();
        let path = '?';

        if (type && category) path = `?type=${type}&category=${category}`;
        if (type && !category) path = `?type=${type}`;

        console.log(path)
        return path;
    }

    async function axiosGetProductsList() {
        const result = await getProductList(getPath());
        return await result.data;
    }

    async function axiosGetCategoriesList() {
        const result = await getCategories();
        return await result.data;
    }

    return (
        <>
            {state.products?.map((item, key) => {
                return <ProductCard
                    key={key}
                    image={"https://www.cisalfasport.it/dw/image/v2/BBVV_PRD/on/demandware.static/-/Sites-cisalfa-master/default/dwdc711253/cisalfa/files/S5544515-18/image/S5544515_18.jpg?sw=444&sh=555"}
                    imageAlt={item.title}
                    category={item.category}
                    brand={item.brand}
                    name={item.name}
                    initialPrice={item.starting_price}
                    price={item.starting_price + 30}
                />
            })}
        </>
    )
}

export default ListProduct;