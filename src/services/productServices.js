import { getData } from "../genericAxios/genericAxios";

export async function getProductList(filter = "") {
  const response = await getData("/products" + filter);

  return { status: response.status, data: response.data };
}

export async function getSearchProducts(term) {
  const response = await getData("/products/search/?q=" + term);

  return { status: response.status, data: response.data };
}

export async function getProduct(id, lang = "it") {
  const response = await getData("/products/" + id + "/" + lang);

  return { status: response.status, data: response.data };
}

export async function getBrands() {
  const response = await getData("/brands");

  return { status: response.status, data: response.data };
}

export async function getCategories(lang) {
  const response = await getData(`/categories/${lang}`);

  return { status: response.status, data: response.data };
}

export async function getColors(lang) {
  const response = await getData(`/colors/${lang}`);

  return { status: response.status, data: response.data };
}

export async function getSizes() {
  const response = await getData("/sizes");

  return { status: response.status, data: response.data };
}
