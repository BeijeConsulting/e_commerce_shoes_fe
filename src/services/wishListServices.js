import {
  deleteDataAuth,
  postDataAuth,
  getDataAuth,
} from "../genericAxios/genericAxios";

export async function getWishList() {
  const response = await getDataAuth("/wishlist");

  return { status: response.status, data: response.data };
}

export async function addWishList(obj, SECRET) {
  const response = await postDataAuth("/wishlist/add", obj, SECRET);

  return { status: response.status, data: response.data };
}

export async function deleteWishList(id) {
  const response = await deleteDataAuth("/wishlist/delete/" + id);

  return { status: response.status, data: response.data };
}
