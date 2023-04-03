import {
  getData,
  putData,
  postDataAuth,
  deleteDataAuth,
} from "../genericAxios/genericAxios";

export async function getAddressList(SECRET) {
  const response = await getData("/user/addresses", SECRET);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function getAddress(addressId, SECRET) {
  const response = await getData("/user/address/" + addressId, SECRET);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function addAddress(dataObj) {
  const response = await postDataAuth("/user/address", dataObj);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function deleteAddress(addressId) {
  const response = await deleteDataAuth("/user/address/" + addressId);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function modifyAddress(addressId, dataObj, SECRET) {
  const response = await putData("/user/address/" + addressId, dataObj, SECRET);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}
