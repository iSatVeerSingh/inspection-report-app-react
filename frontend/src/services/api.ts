import axios from "axios";
import { UserLogin } from "../types";
import { UserDB } from "./clientdb";

const BASE_URL = "/api";

const getAccessToken = async () => {
  const user = await UserDB.user.get("user");
  if (user && user.access_token) {
    return user.access_token;
  }
  return null;
};

export const loginUser = async (userData: UserLogin) => {
  try {
    const response = await axios.post(BASE_URL + "/login", userData, {
      headers: {
        Accept: "application/json",
      },
    });

    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const inspectionApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

inspectionApi.interceptors.request.use(async (config) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.access_token) {
      config.headers.Authorization = `Bearer ${user.access_token}`;
    }
  }
  return config;
});

inspectionApi.interceptors.response.use(
  (response) => response,
  (error) => error.response
);
