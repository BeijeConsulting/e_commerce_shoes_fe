import React from "react";
import { Routes, Route } from "react-router-dom";
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

import Checkout from "../screens/checkout/Checkout";
import Faq from '../screens/faq/Faq';
import AboutUs from "../screens/aboutUs/AbousUs";
import Terms from "../screens/terms/Terms";
import Privacy from "../screens/privacy/Privacy";
import Cookie from "../screens/cookie/Cookie";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Cms />}>
        {/* Homepage */}
        <Route index element={<Home />} />
        <Route path="user-info" element={<UserInfo />}>
          <Route index element={<PersonalData />} />
          <Route path="address-list" element={<AddressList />} />
          <Route path="order-list" element={<OrderList />} />
        </Route>

        {/* Products list */}
        <Route path="/products" element={<ProductsList />}>
          <Route path=":first" element={<ProductsList />} />
          <Route path=":first/:second" element={<ProductsList />} />
        </Route>

        {/* Search */}
        <Route path="/search" element={<Search />} />

        {/* Brands */}
        <Route path="/brands" element={<Cart />} />
        <Route path="/brands/:brand" element={<ProductsList />} />

        {/* Single products */}
        <Route path="/product/:id" element={<SingleProduct />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Customer care */}
        <Route path="/customer-care" element={<CustomerCare />}>
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="returns" element={<ReturnAndRefund />} />
          <Route path="faq" element={<Faq />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="cookie" element={<Cookie />} />
          <Route path="terms-and-condictions" element={<Terms />} />
        </Route>
      </Route>

      <Route path="/checkout" element={<Checkout />} />

      {/* Signin - Signup */}
      <Route path="/identity" element={<Identity />}>
        <Route index element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
      </Route>
    </Routes>
  );
}

export default Routing;
