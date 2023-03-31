import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cms from "../screens/cms/Cms";
import Identity from "../screens/identity/Identity";
import SignupForm from "../components/hookComponents/signupForm/SignupForm";
import LoginForm from "../components/hookComponents/loginForm/LoginForm";
import CustomerCare from "../screens/customerCare/CustomerCare";
import Contacts from "../screens/contacts/Contacts";
import Delivery from "../screens/delivery/Delivery";
import ReturnAndRefund from "../screens/returnsAndRefund/ReturnAndRefund";
import Home from "../screens/home/Home";
import SingleProduct from "../screens/singleProduct/SingleProduct";
import ProductsList from "../screens/productsList/ProductsList";
import Cart from "../screens/cart/Cart";
import Search from "../screens/search/Search";

import UserInfo from "../screens/userInfo/UserInfo";
import PersonalData from "../screens/personalData/PersonalData";
import AddressList from "../screens/adressList/AdressList";
import OrderList from "../screens/orderList/OrderList";
import Cookie from "../screens/cookie/Cookie";
import Terms from "../screens/terms/Terms";
import Privacy from "../screens/privacy/Privacy";

import Checkout from "../screens/checkout/Checkout";
import Faq from "../screens/faq/Faq";
import { getLocalStorage } from "../utils/localStorageUtils";
import { setUserCredentials } from "../redux/ducks/userDuck";
import { getUserAuth } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/ducks/tokenDuck";
import i18n from "../assets/translations/i18n";
import { useTranslation } from "react-i18next";

function Routing() {
  const dispatch = useDispatch();
  const token = getLocalStorage("token");
  const refreshToken = getLocalStorage("refreshToken");
  const lang = i18n.language.slice(0, 2);
  const { t } = useTranslation();

  // check if there is token
  useEffect(() => {
    async function getUserInfo() {
      const response = await getUserAuth(token);

      if (response.status === 200) {
        dispatch(
          setUserCredentials({
            isLogged: true,
            name: response.data.first_name,
            surname: response.data.last_name,
            email: response.data.email,
            adresses: [...response.data.addresses],
            birthDate: response.data.birth_date,
            cartItems: response.data.cart_items,
            wishlistItems: response.data.wish_list_item,
          })
        );
      }
    }

    if (token) {
      dispatch(
        setToken({
          token,
          refreshToken,
        })
      );
      getUserInfo();
    }
  }, []);

  // console.log("TOKEN", isTokenExist)

  function RedirectToLanguage() {
    return <Navigate replace to={lang} />;
  }

  return (
    <Routes>
      <Route path="/" element={<RedirectToLanguage />}></Route>

      <Route path="" element={<RedirectToLanguage />}></Route>

      <Route path="/:lang" element={<Cms />}>
        {/* Homepage */}
        <Route index element={<Home />} />
        <Route path="area-personale" element={<UserInfo />}>
          <Route index element={<PersonalData />} />
          <Route path="indirizzi" element={<AddressList />} />
          <Route path="utenti" element={<OrderList />} />
        </Route>

        {/* Products list */}
        <Route path={"scarpe"} element={<ProductsList />}>
          <Route path=":uno" element={<ProductsList />} />
          <Route path=":uno/:due" element={<ProductsList />} />
        </Route>

        {/* Search */}
        <Route path="ricerca" element={<Search />} />

        {/* Brands */}
        <Route path="brand" element={<Cart />} />
        <Route path="brand/:brand" element={<ProductsList />} />

        {/* Single products */}
        <Route path="scarpa/:id" element={<SingleProduct />} />

        {/* Cart */}
        <Route path="carrello" element={<Cart />} />

        {/* Customer care */}
        <Route path="assistenza" element={<CustomerCare />}>
          <Route path="contatti" element={<Contacts />} />
          <Route path="spedizioni" element={<Delivery />} />
          <Route path="resi" element={<ReturnAndRefund />} />
          <Route path="faq" element={<Faq />} />
          <Route path="cookie-policy" element={<Cookie />} />
          <Route path="termini-condizioni" element={<Terms />} />
          <Route path="resi" element={<ReturnAndRefund />} />
          <Route path="privacy-policy" element={<Privacy />} />
        </Route>
      </Route>

      <Route path=":lang/checkout" element={<Checkout />} />

      {/* Signin - Signup */}
      <Route path=":lang/accedi" element={<Identity />}>
        <Route index element={<LoginForm />} />
        <Route path="registrati" element={<SignupForm />} />
      </Route>
    </Routes>
  );
}

export default Routing;
