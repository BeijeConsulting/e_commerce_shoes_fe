import { getData, postData, putData } from "../genericAxios/genericAxios";

export async function getOrderList(SECRET) {
  const response = await getData("/orders/order_list", SECRET);

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