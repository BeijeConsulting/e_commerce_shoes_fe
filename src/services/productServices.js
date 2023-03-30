import { getData } from "../genericAxios/genericAxios";



export async function getProductsList(page, filter = "") {
  const response = await getData(`/products/page=${page}/perPage=24` + filter);

  return { status: response.status, data: response.data };
}

export async function getNewProductsList(page, filter = "") {
  const response = await getData(`/products/new/page=${page}/perPage=24` + filter);

  return { status: response.status, data: response.data };
}

export async function getSearchProducts(term, page) {
  const response = await getData(`/products/search/page=${page}/perPage=24/?q=${term}`);

  return { status: response.status, data: response.data };
}

export async function getProduct(id, lang) {
  const response = await getData(`/products/${id}/${lang}`);

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
