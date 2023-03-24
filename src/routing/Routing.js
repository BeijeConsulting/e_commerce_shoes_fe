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

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Cms />}>

        {/* Homepage */}
        <Route index element={<Home />} />

        {/* Products list */}
        <Route path="/products" element={<ProductsList />}>
          <Route path=":first" element={<ProductsList />} />
          <Route path=":first/:second" element={<ProductsList />} />
        </Route>

        {/* Single products */}
        <Route path="product/:id" element={<SingleProduct />} />

        {/* Customer care */}
        <Route path="/customer-care" element={<CustomerCare />}>
          <Route path="contacts" element={<Contacts />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="returns" element={<ReturnAndRefund />} />
        </Route>
      </Route>

      {/* Signin - Signup */}
      <Route path="/identity" element={<Identity />}>
        <Route index element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
      </Route>
    </Routes>
  );
}

export default Routing;
