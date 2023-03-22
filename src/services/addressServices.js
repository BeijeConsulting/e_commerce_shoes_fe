import {
  getData,
  deleteData,
  putData,
  postData,
} from "../genericAxios/genericAxios";

export async function getAddressList(SECRET) {
  const response = await getData("/user/addresses", SECRET);

  return { status: response.status, data: response.data };
}

export async function getAddress(addressId, SECRET) {
  const response = await getData("/user/address/" + addressId, SECRET);

  return { status: response.status, data: response.data };
}

export async function addAddress(dataObj, SECRET) {
  const response = await postData("/user/address", dataObj, SECRET);

  return { status: response.status, data: response.data };
}

export async function deleteAddress(addressId, SECRET) {
  const response = await deleteData("/user/address/" + addressId, SECRET);

  return { status: response.status, data: response.data };
}

export async function modifyAddress(addressId, dataObj, SECRET) {
  const response = await putData("/user/address/" + addressId, dataObj, SECRET);

  return { status: response.status, data: response.data };
}
