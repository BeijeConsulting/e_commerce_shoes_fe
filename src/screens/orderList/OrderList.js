import React, { useEffect, useState } from "react";
import { getOrderList } from "../../services/orderServices";
import OrderListAccordion from "../../components/hookComponents/wishListAccordion/OrderListAccordion";
import { getLocalStorage } from "../../utils/localStorageUtils";

function OrderList() {
  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorage("token");
      console.log(token);
      const response = await getOrderList(getLocalStorage("token"));
      console.log(response.status);
    }

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        <OrderListAccordion />
      </ul>
    </div>
  );
}

export default OrderList;
