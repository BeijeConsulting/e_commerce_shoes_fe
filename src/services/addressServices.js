import {
  getData,
  deleteData,
  putData,
  postData,
  postDataAuth,
  deleteDataAuth,
} from "../genericAxios/genericAxios";

export async function getAddressList(SECRET) {
  const response = await getData("/user/addresses", SECRET);

  return { status: response.status, data: response.data };
}

export async function getAddress(addressId, SECRET) {
  const response = await getData("/user/address/" + addressId, SECRET);

  return { status: response.status, data: response.data };
}

export async function addAddress(dataObj) {
  const response = await postDataAuth("/user/address", dataObj);

  return { status: response.status, data: response.data };
}

export async function deleteAddress(addressId) {
  const response = await deleteDataAuth("/user/address/" + addressId);

  return { status: response.status, data: response.data };
}

export async function modifyAddress(addressId, dataObj, SECRET) {
  const response = await putData("/user/address/" + addressId, dataObj, SECRET);

  return { status: response.status, data: response.data };
}
