import {
  getDataAuth,
  postData,
  postDataAuth,
  putData,
} from "../genericAxios/genericAxios";

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

export async function getCoupon(code) {
  const response = await getDataAuth("/coupons/search/code=" + code)
    .then((response) => response)
    .catch((response) => response);

  return { status: response.status, data: response.data };
}

export async function addOrder(orderData) {
  const response = await postDataAuth("/orders/add_order", orderData)
    .then((response) => response)
    .catch((response) => response);

  console.log(response);

  return { status: response.status, data: response.data };
}
