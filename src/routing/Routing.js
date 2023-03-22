import React from "react";
import { Routes, Route } from "react-router-dom";
import Cms from "../screens/cms/Cms";
import Identity from "../screens/identity/Identity";
import SignupForm from "../components/hookComponents/signupForm/SignupForm";
import LoginForm from "../components/hookComponents/loginForm/LoginForm";
import ListProduct from "../screens/productList/ListProduct";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Cms />} />
      <Route path="/prodotti/:first" element={<ListProduct />} />
      <Route path="/prodotti/:first/:second" element={<ListProduct />} />
      <Route path="/identity" element={<Identity />}>
        <Route index element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
      </Route>
    </Routes>
  );
}

export default Routing;
