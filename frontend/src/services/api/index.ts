import axios, { AxiosError, AxiosResponse } from "axios";

const HOST = "https://dev.inspectionapp.com";

const inspectionApi = axios.create({
  baseURL: "",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default inspectionApi;

export const libraryApi = axios.create({
  baseURL: HOST + "/api/library-items",
  headers: {
    Accept: "application/json",
  },
});

libraryApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.log(error)
    return error;
  }
);
