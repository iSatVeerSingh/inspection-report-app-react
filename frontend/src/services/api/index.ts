import axios from "axios";

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
  baseURL: "https://dev.inspectionapp.com/api/library-items",
  headers: {
    Accept: "application/json",
  },
});