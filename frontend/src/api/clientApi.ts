import axios from "axios";

const clientApi = axios.create({
  baseURL: "/client",
  headers: {
    Accept: "application/json",
  },
});

clientApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);

export default clientApi;
