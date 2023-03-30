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
import Faq from '../screens/faq/Faq';
import { useDispatch } from 'react-redux';
import { getLocalStorage } from '../utils/localStorageUtils';
import { setToken } from '../redux/ducks/tokenDuck';
import { setUserCredentials } from '../redux/ducks/userDuck';
import { getUserAuth } from '../services/authServices';
import i18n from "../assets/translations/i18n";
import { useTranslation } from "react-i18next";

function Routing() {
  const dispatch = useDispatch()
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
            name: response.data.name,
            surname: response.data.surname,
            email: response.data.email,
            adresses: [...response.data.addresses],
            birthDate: {
              dayOfMonth: response.data.birthDate.dayOfMonth,
              monthValue: response.data.birthDate.monthValue,
              month: response.data.birthDate.month,
              year: response.data.birthDate.year,
            },
            cartItems: response.data.cartItems,
            wishlistItems: response.data.wishlistItems,
          })
        );
      }
    }

    if (token) {
      dispatch(
        setToken({
          token,
          refreshToken
        })
      )
      getUserInfo();
    }
  }, []);




  // console.log("TOKEN", isTokenExist)

  function RedirectToLanguage() {
    return <Navigate replace to={lang} />
  }

  return (
    <Routes>

      <Route path="" element={<RedirectToLanguage />}></Route>

      <Route path="/:lang" element={<Cms />}>
        {/* Homepage */}
        <Route index element={<Home />} />
        <Route path="user-info" element={<UserInfo />}>
          <Route index element={<PersonalData />} />
          <Route path="address-list" element={<AddressList />} />
          <Route path="order-list" element={<OrderList />} />
        </Route>

        {/* Products list */}
        <Route path={"products"} element={<ProductsList />}>
          <Route path=":first" element={<ProductsList />} />
          <Route path=":first/:second" element={<ProductsList />} />
        </Route>

        {/* Search */}
        <Route path="search" element={<Search />} />

        {/* Brands */}
        <Route path="brands" element={<Cart />} />
        <Route path="brands/:brand" element={<ProductsList />} />

        {/* Single products */}
        <Route path="product/:id" element={<SingleProduct />} />

        {/* Cart */}
        <Route path="cart" element={<Cart />} />

        {/* Customer care */}
        <Route path="customer-care" element={<CustomerCare />}>
          <Route path="contacts" element={<Contacts />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="returns" element={<ReturnAndRefund />} />
          <Route path="faq" element={<Faq />} />
          <Route path="cookie" element={<Cookie />} />
          <Route path="terms-and-condictions" element={<Terms />} />
          <Route path="returns" element={<ReturnAndRefund />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
      </Route>

      <Route path="checkout" element={<Checkout />} />

      {/* Signin - Signup */}
      <Route path=":lang/identity" element={<Identity />}>
        <Route index element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
      </Route>
    </Routes>
  );
}

export default Routing;
