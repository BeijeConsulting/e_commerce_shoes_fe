import { getData } from "../genericAxios/genericAxios";

export async function getProductList(filter = "") {
  const response = await getData("/api/products" + filter);

  return { status: response.status, data: response.data };
}

export async function getProduct(id, lang = "it") {
  const response = await getData("/api/products/" + id + "/" + lang);

  return { status: response.status, data: response.data };
}
