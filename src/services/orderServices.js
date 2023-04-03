import { getDataAuth, postData, putData } from "../genericAxios/genericAxios";

export async function getOrderList() {
  const response = await getDataAuth("/orders/order_list");

  return { status: response.status, data: response.data };
}

export async function sendOrder(orderData, SECRET) {
  const response = await postData("/orders/add_order", orderData, SECRET);

  return { status: response.status, data: response.data };
}

export async function deleteOrder(orderData, SECRET) {
  const response = await putData("/orders/delete_order", orderData, SECRET);

  return { status: response.status, data: response.data };
}

export async function modifyOrder(orderData, SECRET) {
  const response = await putData("/orders/modify_order", orderData, SECRET);

  return { status: response.status, data: response.data };
}

export async function getCoupon(id) {
  const response = await getDataAuth("/coupons/search/id=" + id)
    .then((response) => response)
    .catch((response) => response);

  return { status: response.status, data: response.data };
}
