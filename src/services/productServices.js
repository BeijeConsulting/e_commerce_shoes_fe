import { getData } from "../genericAxios/genericAxios";

export async function getProductList(filter = "") {
  const response = await getData("/api/products" + filter);

  return { status: response.status, data: response.data };
}

export async function getProduct(id, lang = "it") {
  const response = await getData("/api/products/" + id + "/" + lang);

  return { status: response.status, data: response.data };
}

export async function getBrands() {
  const response = await getData("/api/brands");

  return { status: response.status, data: response.data };
}

export async function getCategories() {
  const response = await getData("/api/categories");

  return { status: response.status, data: response.data };
}

export async function getColors() {
  const response = await getData("/api/colors");

  return { status: response.status, data: response.data };
}

export async function getSizes() {
  const response = await getData("/api/sizes");

  return { status: response.status, data: response.data };
}
