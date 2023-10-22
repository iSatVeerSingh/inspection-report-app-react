import axios from "axios";

const inspectionApi = axios.create({
  baseURL: "",
});

export default inspectionApi;
