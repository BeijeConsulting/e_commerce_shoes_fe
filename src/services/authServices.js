import {
  getData,
  getDataAuth,
  postData,
  postDataAuth,
  putDataAuth,
} from "../genericAxios/genericAxios";
import { getLocalStorage } from "../utils/localStorageUtils";

export async function authCheck() {
  const response = await getData("/check");
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function signin(credentials) {
  const response = await postData("/signin", credentials);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function signUp(obj) {
  const response = await postData("/signup", obj);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

// UPDATE user
export async function updateUser(obj) {
  const response = await putDataAuth("/user", obj);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function signOut(refreshToken, SECRET) {
  const response = await postDataAuth(
    "/sign_out",
    { refreshToken: refreshToken },
    SECRET
  );
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function refreshToken() {
  const refreshTokenStorage = getLocalStorage("refreshToken");
  const response = await postData("/refresh_token", {
    refreshToken: refreshTokenStorage,
  });
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

export async function getUser(SECRET) {
  const response = await getData("/user", SECRET);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}

// GET user data with Authentication
export async function getUserAuth(SECRET) {
  const response = await getDataAuth("/user", SECRET);
  if (response.status < 300) {
    return { status: response.status, data: response.data };
  }
  return { status: response.status, message: response.data.message };
}
