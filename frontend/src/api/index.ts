import axios from "axios";
import { LoginData } from "../pages/Login";
const BASE_URL = "/api";

export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await axios.post(BASE_URL + "/login", loginData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err: any) {
    return err.response ? err.response : err;
  }
};

export const inspectionApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

inspectionApi.interceptors.request.use(async (config) => {
  const jsonUser = localStorage.getItem("user");
  if (jsonUser) {
    const user = JSON.parse(jsonUser);
    config.headers.Authorization = `Bearer ${user.access_token}`;
  }
  return config;
});

inspectionApi.interceptors.response.use(
  (response) => response,
  (error) => error.response
);
