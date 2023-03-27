import { getData } from "../genericAxios/genericAxios";

export async function getCartList(SECRET) {
  const response = await getData("/api/shoppingcart", SECRET);

  return { status: response.status, data: response.data };
}

export async function getCartListDetail(detailsId, SECRET) {
  const response = await getData("/api/shoppingcart/" + detailsId, SECRET);

  return { status: response.status, data: response.data };
}
