import {
  deleteDataAuth,
  getData,
  getDataAuth,
  postDataAuth,
  putDataAuthParams,
} from "../genericAxios/genericAxios";

export async function getCartList() {
  const response = await getDataAuth("/shoppingcart");
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function getCartListDetail(detailsId, SECRET) {
  const response = await getData("/shoppingcart/" + detailsId, SECRET);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function addItemToCartList(item) {
  const response = await postDataAuth("/shoppingcart/add", item);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function addListItemToCartList(items) {
  const response = await postDataAuth("/shoppingcart/additemslist", items);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function updateItemToCartList(itemId, newQuantity) {
  const response = await putDataAuthParams(
    "/shoppingcart/update/" + itemId + "?new_quantity=" + newQuantity
  );
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function deleteCartItem(id) {
  const response = await deleteDataAuth("/shoppingcart/delete/" + id);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}
