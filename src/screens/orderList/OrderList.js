import React, { useEffect, useState } from "react";

// API
import { getOrderList } from "../../services/orderServices";
// Components
import OrderListAccordion from "../../components/hookComponents/wishListAccordion/OrderListAccordion";
// Redux
import { useSelector } from "react-redux";
// Seo
import Seo from "../../components/functionalComponents/Seo";
// i18n
import { useTranslation } from "react-i18next";

function OrderList() {
  const { t } = useTranslation();
  const userFirstName = useSelector((state) => state.userDuck.name);
  const userLastName = useSelector((state) => state.userDuck.surname);
  // const token = useSelector((state) => state.tokenDuck.token);

  const [state, setState] = useState({
    orderList: [],
    totalQuantity: [],
    productList: [],
  });

  useEffect(() => {
    async function fetchData() {
      const response = await getOrderList();
      // console.log("ORDERLIST:", response.data);

      if (response.status !== 200) return;

      setState({
        ...state,
        orderList: response.data.orders,
        totalQuantity: calcTotalQuantity(response.data.orders),
      });
    }

    fetchData();
  }, []);

  function calcTotalQuantity(orders) {
    let totalQuantity = Array(orders.length).fill(0);
    // console.log(orders);
    // orders.forEach((order, i) => {
    //   order.productList.forEach((product) => {
    //     totalQuantity[i] += product.quantity;
    //   });
    // });

    orders.forEach((order, i) => {
      totalQuantity[i] += order.productList.length;
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

  return (
    <div>
      <Seo
        title={t("orders.title")}
        description="Gestione degli ordini"
        content="e-commerce"
      />
      {<ul>{state.orderList.map(renderOrderList)}</ul>}
    </div>
  );
}

export default OrderList;
