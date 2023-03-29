import { getData, getDataAuth, postData, putData } from "../genericAxios/genericAxios";
import { getLocalStorage } from '../utils/localStorageUtils';

export async function getOrderList() {
  const tokenStorage = getLocalStorage("token")
  const response = await getDataAuth("/orders/order_list", tokenStorage);

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
