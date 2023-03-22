import axios from "axios";
import { PROPERTIES } from "../utils/properties";

const axiosInstance = axios.create({
  baseURL: PROPERTIES.BASE_URL,
  timeout: PROPERTIES.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function postData(resource, obj, header = null) {
  const response = await axiosInstance.post(resource, obj, {
    headers: header !== null ? { Authorization: `Bearer ${header}` } : null,
  });

  return response;
}

export async function getData(resource, header = null) {
  const response = await axiosInstance.get(resource, {
    headers: header !== null ? { Authorization: `Bearer ${header}` } : null,
  });

  return response;
}

export async function putData(resource, obj, header = null) {
  const response = await axiosInstance.put(resource, obj, {
    headers: header !== null ? { Authorization: `Bearer ${header}` } : null,
  });

  return response;
}

export async function deleteData(resource, header = null) {
  const response = await axiosInstance.put(resource, {
    headers: header !== null ? { Authorization: `Bearer ${header}` } : null,
  });

  return response;
}
