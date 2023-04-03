import { getData } from "../genericAxios/genericAxios";

export async function getProductsList(page, lang, filter = "", perPage = 12) {
  const response = await getData(`/products/page=${page}/perPage=${perPage}/${lang}` + filter);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function getNewProductsList(page, lang, filter = "", perPage = 12) {
  const response = await getData(`/products/new/page=${page}/perPage=${perPage}/${lang}` + filter);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function getSearchProducts(page, lang, term, perPage = 12) {
  const response = await getData(`/products/search/page=${page}/perPage=${perPage}/${lang}?q=${term}`);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function getProduct(id, lang) {
  const response = await getData(`/products/${id}/${lang}`);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function getBrands() {
  const response = await getData("/brands");
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function getCategories(lang) {
  const response = await getData(`/categories/${lang}`);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function getColors(lang) {
  const response = await getData(`/colors/${lang}`);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function getSizes() {
  const response = await getData("/sizes");
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}
