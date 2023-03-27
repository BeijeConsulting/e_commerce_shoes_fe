import { getData, postData } from "../genericAxios/genericAxios";

export async function authCheck() {
  const response = await getData("/check");

  return { status: response.status, data: response.data };
}

export async function signin(credentials) {
  const response = await postData("/signin", credentials);

  return { status: response.status, data: response.data };
}

export async function signUp(obj) {
  const response = await postData("/signup", obj);

  return { status: response.status, data: response.data };
}

export async function signout(refreshTokenObj, SECRET) {
  const response = await postData("/sign_out", refreshTokenObj, SECRET);

  return { status: response.status, data: response.data };
}

export async function refreshToken(refreshTokenObj, SECRET) {
  const response = await postData("/refresh_token", refreshTokenObj, SECRET);

  return { status: response.status, data: response.data };
}

export async function getUser(SECRET) {
  const response = await getData("/user", SECRET);

  return { status: response.status, data: response.data };
}
