import React from "react";
import { Routes, Route } from "react-router-dom";
import Cms from "../screens/cms/Cms";
import Identity from "../screens/identity/Identity";
import SignupForm from "../components/hookComponents/signupForm/SignupForm";
import LoginForm from "../components/hookComponents/loginForm/LoginForm";
import CustomerCare from '../screens/customerCare/CustomerCare';
import Contacts from '../screens/contacts/Contacts';
import Delivery from '../screens/delivery/Delivery';
import ReturnAndRefund from '../screens/returnsAndRefund/ReturnAndRefund';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={ <Cms /> } />
      <Route path="/identity" element={ <Identity /> }>
        <Route index element={ <LoginForm /> } />
        <Route path="signup" element={ <SignupForm /> } />
      </Route>

      <Route path='/customerCare' element={ <CustomerCare /> }>
        <Route path='contacts' element={ <Contacts /> } />
        <Route path='delivery' element={ <Delivery /> } />
        <Route path='returnAndRefund' element={ <ReturnAndRefund /> } />
      </Route>



    </Routes>
  );
}

export default Routing;
