import React, { useState, useEffect } from "react";
import "./productsList.scss";
import {
  getProductsList,
  getNewProductsList,
  getCategories,
} from "../../services/productServices";
import ProductCard from "../../components/functionalComponents/ProductCard/ProductCard";
import ProductGridLayout from "../../components/functionalComponents/productGridLayout/ProductGridLayout";
import FilterMenu from "../../components/hookComponents/filterMenu/FilterMenu";
import { useLocation } from "react-router-dom";
import i18n from "../../assets/translations/i18n";
import Pagination from "@mui/material/Pagination";
import Seo from "../../components/functionalComponents/Seo";
import { useTranslation } from "react-i18next";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function ProductsList() {
  const { t } = useTranslation();
  const location = useLocation();
  const { pathname } = location;
  const lang = i18n.language.slice(0, 2);
  const types = ["uomo", "donna", "unisex"];
  const pathToArray = pathname.split("/").filter((item) => item !== "");

  const [state, setState] = useState({
    products: null,
    query: "",
    pages: null,
    currentPage: 1,
    title: "",
  });

  useEffect(() => {
    fetchProducts();
  }, [pathname]);

  async function fetchProducts(obj = undefined) {
    const categories = await getCategories(lang);
    let type = null;
    let category = null;
    let brand = null;
    let response = null;
    let query = "";
    let title = "";

    if (pathToArray[2] === types[0]) type = "m";
    if (pathToArray[2] === types[1]) type = "w";
    if (pathToArray[2] === types[2]) type = "unisex";

    if (pathToArray.length === 3) {
      title = getTitle();
      if (pathToArray[2] !== "novita") {
        query = `?type=${type}`;
      }
      if (pathToArray[1] === "brand") {
        brand = pathToArray[2].split("-").join("%20");
        query = `?brand=${brand}`;
      }
    } else if (pathToArray.length === 4) {
      category = pathToArray[3].split("-").join("%20");
      for (let i = 0; i < categories.data.length; i++) {
        console.log(
          categories.data[i].category.toLowerCase(),
          category.toLowerCase()
        );
        if (categories.data[i].code.toLowerCase() === category.toLowerCase()) {
          title = getTitle(categories.data[i].category);
        }
      }
      query = `?type=${type}&category=${category}`;
    }

    if (obj) {
      if (obj.type === null) obj.type = type;
      if (obj.category === null) obj.category = category;
      if (obj.brand === null) obj.brand = brand;
      query = getQuery(obj);
    }

    if (pathToArray[2] === "novita") {
      response = await getNewProductsList(state.currentPage, lang, query);
    } else {
      response = await getProductsList(state.currentPage, lang, query);
    }

    setState({
      ...state,
      products: response?.data?.products,
      pages: response?.data?.pages,
      query,
      title,
    });
  }

  async function fetchPaginatedProducts(e, p) {
    const query = state.query;
    let result = null;

    if (pathToArray[2] === "novita") {
      result = await getNewProductsList(p, lang, query);
    } else {
      result = await getProductsList(p, lang, query);
    }

    setState({
      ...state,
      products: result.data.products,
      currentPage: p,
    });
  }

  function getQuery(obj) {
    let query = "?";
    for (let key in obj) {
      if (obj[key] !== null) {
        if (key === "price") {
          query += `minPrice=${obj[key][0]}&maxPrice=${obj[key][1]}&`;
        } else {
          query += `${key}=${obj[key]}&`;
        }
      }
    }
    if (query.length < 2) query = "";
    if (query) query = query.slice(0, query.length - 1);
    return query;
  }

  function mapProducts(item, key) {
    return (
      <ProductCard
        key={`${key}-${Math.random()}`}
        image={
          "https://www.cisalfasport.it/dw/image/v2/BBVV_PRD/on/demandware.static/-/Sites-cisalfa-master/default/dwdc711253/cisalfa/files/S5544515-18/image/S5544515_18.jpg?sw=444&sh=555"
        }
        imageAlt={item.title}
        category={item.category}
        brand={item.brand}
        name={item.name}
        price={item.starting_price}
        idProduct={item.id}
      />
    );
  }

  function getTitle(category = null) {
    let title = "Scarpe";

    if (pathToArray[2] === "novita") {
      title = t("productsList.newShoes");
    } else if (pathToArray[2] === "uomo") {
      title = t("productsList.manShoes");
    } else if (pathToArray[2] === "donna") {
      title = t("productsList.womanShoes");
    } else if (pathToArray[2] === "unisex") {
      title = t("productsList.unisexShoes");
    } else if (pathToArray[1] === "brand") {
      title = pathToArray[2];
    }

    if (category) title += ": " + category;
    return title;
  }

  function renderSkeleton() {
    const skeletonArray = [];
    for (let i = 0; i < 8; i++) {
      skeletonArray.push(
        <Box sx={{ width: "100%" }}>
          <Skeleton variant="rectangular" height={280} />
          <Skeleton height={70} />
        </Box>
      );
    }
    return skeletonArray;
  }

  return (
    <>
      <Seo
        title={t("productsList.products")}
        description="E-commerce di scarpe italiane"
        content="e-commerce"
      />

      <div className="products-list">
        {state.products === null ? (
          <>
            <Box sx={{ width: "50%", margin: "0 auto" }}>
              <Skeleton height={60} />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Skeleton variant="rectangular" height={120} />
            </Box>
          </>
        ) : (
          <>
            <h1>{state.title}</h1>
            <FilterMenu types={types} filterFunc={fetchProducts} />
          </>
        )}
        {state.products === null && (
          <ProductGridLayout>{renderSkeleton()}</ProductGridLayout>
        )}
        {state.products && state.products.length > 0 && (
          <ProductGridLayout>
            {state.products.map(mapProducts)}
          </ProductGridLayout>
        )}
        {state.products !== null && state.products.length === 0 && (
          <h2 className="products-list__no-products">
            {t("productsList.noProducts")}
          </h2>
        )}
        {state.pages > 1 && (
          <div className="pagination">
            <Pagination
              onChange={fetchPaginatedProducts}
              page={state.currentPage}
              count={state.pages}
              size={"large"}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ProductsList;
