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

  return { status: response?.status, data: response?.data };
}

export async function signin(credentials) {
  const response = await postData("/signin", credentials);

  return { status: response?.status, data: response?.data };
}

export async function signUp(obj) {
  const response = await postData("/signup", obj);

  return { status: response?.status, data: response?.data };
}

// UPDATE user
export async function updateUser(obj) {
  const response = await putDataAuth("/user", obj);

  return { status: response?.status, data: response?.data };
}

export async function signOut(refreshToken, SECRET) {
  const response = await postDataAuth(
    "/sign_out",
    { refreshToken: refreshToken },
    SECRET
  );

  return { status: response?.status, data: response?.data };
}

export async function refreshToken() {
  const refreshTokenStorage = getLocalStorage("refreshToken");
  const response = await postData("/refresh_token", {
    refreshToken: refreshTokenStorage,
  });

  return { status: response?.status, data: response?.data };
}

export async function getUser(SECRET) {
  const response = await getData("/user", SECRET);

  return { status: response?.status, data: response?.data };
}

// GET user data with Authentication
export async function getUserAuth(SECRET) {
  const response = await getDataAuth("/user", SECRET);

  return { status: response?.status, data: response?.data };
}
