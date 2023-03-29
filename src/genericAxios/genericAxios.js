import axios from "axios";
import { PROPERTIES } from "../utils/properties";

import { refreshToken } from '../services/authServices';
import { getLocalStorage, setLocalStorage } from '../utils/localStorageUtils';

import store from "../redux/store"
import { setToken } from '../redux/ducks/tokenDuck';

const axiosInstance = axios.create({
  baseURL: PROPERTIES.BASE_URL,
  timeout: PROPERTIES.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

//instanza axios per chiamate con richiesta di autenticazione
const axiosInstanceToken = axios.create({
  baseURL: PROPERTIES.BASE_URL,
  timeout: PROPERTIES.TIMEOUT,
});

//intercetta le richieste con autenticazione, controlla nello storage se esiste il token e lo inserisce nell'header
axiosInstanceToken.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }
    // console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//intercetta la risposta
axiosInstanceToken.interceptors.response.use(
  //se positiva invia la risposta
  function (response) {
    return response;
  },
  //se con errore
  async function (error) {
    console.log("responseError", error);
    const originalRequest = error.config;
    //se l'errore è 401 usa il refresh Token per ricevere il nuovo token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const updateToken = await refreshToken();
      console.log("generic Axios - UPDATETOKEN", updateToken);
      if (updateToken.status === 200) {
        const { token, refreshToken } = updateToken.data;

        store.dispatch(setToken(
          {
            token,
            refreshToken
          }
        ))


        setLocalStorage("token", token);
        setLocalStorage("refreshToken", refreshToken);
        //riprova a fare la chiamata avendo il token aggiornato nello storage
        return axiosInstanceToken(originalRequest);
      }
    }
    //qui gestire altri errori 403, 404, 500
    return Promise.reject(error);
  }
);


export async function postData(resource, obj, header = null) {
  const response = await axiosInstance.post(resource, obj, {
    headers: header !== null ? { Authorization: `Bearer ${header}` } : null,
  });

  return response;
}
// POST with Authentication
export async function postDataAuth(resource, obj) {
  const response = await axiosInstanceToken.post(resource, obj);

  return response;
}

export async function getData(resource, header = null) {
  const response = await axiosInstance.get(resource, {
    headers: header !== null ? { Authorization: `Bearer ${header}` } : null,
  });

  return response;
}
// GET with Authentication
export async function getDataAuth(resource) {
  const response = await axiosInstanceToken.get(resource);

  return response;
}

export async function putData(resource, obj, header = null) {
  const response = await axiosInstance.put(resource, obj, {
    headers: header !== null ? { Authorization: `Bearer ${header}` } : null,
  });

  return response;
}
// PUT with Authentication
export async function putDataAuth(resource, obj, header = null) {
  const response = await axiosInstanceToken.put(resource, obj, {
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
// DELETE with Authentication
export async function deleteDataAuth(resource, header = null) {
  const response = await axiosInstance.put(resource, {
    headers: header !== null ? { Authorization: `Bearer ${header}` } : null,
  });

  return response;
}
