import {
  deleteDataAuth,
  getData,
  getDataAuth,
  postData,
  postDataAuth,
  putData,
  putDataAuthParams,
  putDataParams,
} from "../genericAxios/genericAxios";

export async function getCartList() {
  const response = await getDataAuth("/shoppingcart");

  return { status: response.status, data: response.data };
}

export async function getCartListDetail(detailsId, SECRET) {
  const response = await getData("/shoppingcart/" + detailsId, SECRET);

  return { status: response.status, data: response.data };
}

export async function addItemToCartList(item) {
  const response = await postDataAuth("/shoppingcart/add", item);

  return { status: response.status, data: response.data };
}

export async function addListItemToCartList(items) {
  const response = await postDataAuth("/shoppingcart/additemslist", items);

  return { status: response.status, data: response.data };
}

export async function updateItemToCartList(itemId, newQuantity) {
  console.log(
    "/shoppingcart/update/" + itemId + "?new_quantity=" + newQuantity
  );
  const response = await putDataAuthParams(
    "/shoppingcart/update/" + itemId + "?new_quantity=" + newQuantity
  );

  return { status: response.status, data: response.data };
}

export async function deleteCartItem(id) {
  const response = await deleteDataAuth("/shoppingcart/delete/" + id);

  return { status: response.status, data: response.data };
}
