import {
  getData,
  getDataAuth,
  postData,
  postDataAuth,
  putData,
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

export async function updateItemToCartList(itemId, SECRET) {
  const response = await putDataParams(
    "/shoppingcart/update/" + itemId,
    SECRET
  );

  return { status: response.status, data: response.data };
}
