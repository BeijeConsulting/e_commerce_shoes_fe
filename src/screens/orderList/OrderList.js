import React, { useEffect, useState } from "react";
import { getOrderList } from "../../services/orderServices";
import OrderListAccordion from "../../components/hookComponents/wishListAccordion/OrderListAccordion";
import { getLocalStorage } from "../../utils/localStorageUtils";
import { useSelector } from "react-redux";

function OrderList() {
  const userFirstName = useSelector((state) => state.userDuck.name);
  const userLastName = useSelector((state) => state.userDuck.surname);

  const [state, setState] = useState({
    orderList: [],
    totalQuantity: [],
  });

  useEffect(() => {
    async function fetchData() {
      const token = getLocalStorage("token");
      const response = await getOrderList(getLocalStorage("token"));

      if (response.status === 200) {
        setState({
          ...state,
          orderList: response.data.orders,
          totalQuantity: calcTotalQuantity(response.data.orders),
        });
      }
    }

    fetchData();
  }, []);

  function calcTotalQuantity(orders) {
    let totalQuantity = Array(orders.length).fill(0);
    console.log(orders);
    orders.forEach((order, i) => {
      order.productList.forEach((product) => {
        totalQuantity[i] += product.quantity;
      });
    });

    return totalQuantity;
  }

  function renderOrderList(order, i) {
    return (
      <li key={order.orderId}>
        <OrderListAccordion
          recipient={{ firstName: userFirstName, lastName: userLastName }}
          totalQuantity={state.totalQuantity[i]}
          totalPrice={Number(order.paidTotalPrice).toFixed(2)}
          products={order.productList}
        />
      </li>
    );
  }

  return <div>{<ul>{state.orderList.map(renderOrderList)}</ul>}</div>;
}

export default OrderList;
