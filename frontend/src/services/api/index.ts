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
