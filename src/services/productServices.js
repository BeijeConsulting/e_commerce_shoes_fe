import { getData } from "../genericAxios/genericAxios";



export async function getProductsList(page, lang, filter = "") {
  const response = await getData(`/products/page=${page}/perPage=2/${lang}` + filter);

  return { status: response.status, data: response.data };
}

export async function getNewProductsList(page, lang, filter = "") {
  const response = await getData(`/products/new/page=${page}/perPage=2/${lang}` + filter);

  return { status: response.status, data: response.data };
}

export async function getSearchProducts(page, lang, term) {
  const response = await getData(`/products/search/page=${page}/perPage=2/${lang}?q=${term}`);

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
